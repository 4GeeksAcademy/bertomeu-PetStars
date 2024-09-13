"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Post, CommentPost, ForumTopic, TopicResponse
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import timedelta

# from models import Person


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

#Setup de JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT-KEY")  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
jwt = JWTManager(app)

#Setuo Bcrypt
bcrypt = Bcrypt(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route("/api/register", methods=["POST"])
def register():
    body = request.get_json(silent=True)
    if not body or 'email' not in body or 'password' not in body or 'petStar' not in body:
        return jsonify({'msg': 'Email, password and petstar fields are required'}), 400
    
    existing_user = User.query.filter_by(email=body['email']).first()
    if existing_user:
        return jsonify({'msg': 'The email used is already in use'}), 400    
   
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_user = User()    
    new_user.email = body['email']
    new_user.password = pw_hash
    new_user.petStar = body['petStar']
    if 'userPhoto' in body:
        new_user.userPhoto = body['userPhoto']   
    if 'breed' in body:
        new_user.breed = body['breed']
    if 'birthDate' in body:
        new_user.birthDate = body['birthDate']
    if 'hobbies' in body:
        new_user.hobbies = body['hobbies']
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'New user created'}), 201

@app.route("/api/login", methods=["POST"])
def login():
    body = request.get_json(silent=True)
    if not body or 'email' not in body or 'password' not in body:
        return jsonify({'msg': 'Email and password fields are required'}), 400
    user = User.query.filter_by(email=body['email']).first()
    if not user or bcrypt.check_password_hash(user.password, body['password']) is False:
        return jsonify({'msg': 'Invalid email or password'}), 400
    access_token = create_access_token(identity=user.email)
    return jsonify({'msg': 'Ok',
                    'jwt_token': access_token,
                    'user_data': {
                        'id': user.id,
                        'email': user.email
                        
                    }
                    }), 200

@app.route("/api/user", methods=["GET"])
@jwt_required()
def get_user_info():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    return jsonify({'msg': 'ok', 
                    'user_data': {                                
                                'email': user.email,
                                'userphoto': user.userPhoto,
                                'petStar': user.petStar,
                                'breed': user.breed,
                                'birthDate': user.birthDate,
                                'hobbies': user.hobbies
    }}), 200

@app.route("/api/user", methods=["PUT"])
@jwt_required()
def modified_user_info():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    body = request.get_json(silent=True)
        
    for field in ['userPhoto', 'petStar', 'breed', 'birthDate', 'hobbies']:
        if field in body:
            setattr(user, field, body[field])
        
    db.session.commit()
    return jsonify({'msg': 'Information updated successfully'}), 200

@app.route("/api/post", methods=["POST"])
@jwt_required()
def add_post():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    body = request.get_json(silent=True)

    if not body or 'postPhoto' not in body:
        return jsonify({'msg': 'postPhoto is a required field'}), 400
    
    new_post = Post()
    new_post.postPhoto = body['postPhoto']
    if 'postText' in body:
        new_post.postText = body['postText']

    new_post.user_relationship = user    

    db.session.add(new_post)
    db.session.commit()
    return jsonify({'msg': 'New post created'}), 201    
    
@app.route("/api/singlePosts", methods=["GET"])
@jwt_required()
def get_single_posts():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    posts = Post.query.filter_by(user_id=user.id).all()
    
    return jsonify({'msg': 'ok', 
                    'author': {
                        'email': user.email,
                        'petStar': user.petStar
                    },                    
                    'posts': [{
                        'id': post.id,
                        'postPhoto': post.postPhoto,
                        'postText': post.postText
                    } for post in posts]
                    }), 200

@app.route("/api/allPosts", methods=["GET"])
@jwt_required()
def get_all_posts():       
    posts = Post.query.all()
    return jsonify({'msg': 'ok', 
                    'posts': [{
                        'id': post.id,
                        'postPhoto': post.postPhoto,
                        'postText': post.postText,
                        'author': {
                            'petStar': post.user_relationship.petStar,
                            'email': post.user_relationship.email
                        }
                    } for post in posts]
                    }), 200

@app.route("/api/commentPost/<int:post_id>", methods=["POST"])
@jwt_required()
def add_comment_post(post_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    body = request.get_json(silent=True)

    if not body or 'commentPostText' not in body:
        return jsonify({'msg': 'commentPostText is a required field'}), 400
    
    post = Post.query.get(post_id)
    if post is None:
        return jsonify({'msg': 'Post not found'}), 404
    
    new_commentPostText = CommentPost()
    new_commentPostText.commentPostText = body['commentPostText']
    new_commentPostText.post_relationship = post
    new_commentPostText.user_relationship = user

    db.session.add(new_commentPostText)
    db.session.commit()
    return jsonify({'msg': 'New commentPostText created'}), 201 

@app.route("/api/commentPost/<int:post_id>", methods=["GET"])
@jwt_required()
def get_all_comment_post(post_id):
    post = Post.query.get(post_id)
    if post is None:
        return jsonify({'msg': 'Post not found'}), 404
    
    commentPosts = CommentPost.query.filter_by(post_id=post_id).all()
    return jsonify({'msg': 'ok', 
                    'post': {
                        'id': post.id,
                        'postPhoto': post.postPhoto,
                        'postText': post.postText, 
                        'author': {
                            'petStar': post.user_relationship.petStar,
                            'email': post.user_relationship.email
                        }                       
                    },
                    'commentPost': [{
                        'id': commentPost.id,
                        'commentPost': commentPost.commentPostText, 
                        'author': {
                            'petStar': commentPost.user_relationship.petStar,
                            'email': commentPost.user_relationship.email
                        }                                               
                    } for commentPost in commentPosts]
                    }), 200

@app.route("/api/forumTopic", methods=["POST"])
@jwt_required()
def add_forum_topic():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    body = request.get_json(silent=True)

    if not body or 'forumTopicTittle' not in body or 'forumTopicText' not in body:
        return jsonify({'msg': 'forumTopicTittle and forumTopicText fields are required'}), 400
    
    new_forumTopic = ForumTopic()
    new_forumTopic.forumTopicTittle = body['forumTopicTittle']
    new_forumTopic.forumTopicText = body['forumTopicText']

    new_forumTopic.user_relationship = user

    db.session.add(new_forumTopic)
    db.session.commit()
    return jsonify({'msg': 'New forumTopic created'}), 201 

@app.route("/api/singleForumTopics", methods=["GET"])
@jwt_required()
def get_single_forum_topics():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    forumTopics = ForumTopic.query.filter_by(user_id=user.id).all()

    return jsonify({
        'msg':'ok',
        'author': {
            'email': user.email,
            'petStar': user.petStar
        },
        'forumTopics': [{
            'id': forumTopic.id,
            'forumTopicTittle': forumTopic.forumTopicTittle,
            'forumTopicText': forumTopic.forumTopicText
        } for forumTopic in forumTopics]
    }), 200

@app.route("/api/allForumTopics", methods=["GET"])
@jwt_required()
def get_all_forum_topics():
    forumTopics = ForumTopic.query.all()
    return jsonify({
        'msg': 'ok',
        'forumTopics': [{
            'id': forumTopic.id,
            'forumTopicTittle': forumTopic.forumTopicTittle,
            'forumTopicText': forumTopic.forumTopicText,
            'author': {
                'petStar': forumTopic.user_relationship.petStar,
                'email': forumTopic.user_relationship.email
            }
        } for forumTopic in forumTopics]
    }), 200

@app.route("/api/topicResponse/<int:forumTopic_id>", methods=["POST"])
@jwt_required()
def add_topic_response(forumTopic_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    body = request.get_json(silent=True)

    if not body or 'topicResponseText' not in body:
        return jsonify({'msg': 'topicResponseText is a required field'}), 400
    
    forumTopic = ForumTopic.query.get(forumTopic_id)
    if forumTopic is None:
        return jsonify({'msg': 'forumTopic not found'}), 404
    
    new_topicResponseText = TopicResponse()
    new_topicResponseText.topicResponseText = body['topicResponseText']
    new_topicResponseText.forumtopic_relationship = forumTopic
    new_topicResponseText.user_relationship = user

    db.session.add(new_topicResponseText)
    db.session.commit()
    return jsonify({'msg': 'New topicResponseText created'}), 201

@app.route("/api/topicResponse/<int:forumTopic_id>", methods=["GET"])
@jwt_required()
def get_all_topic_response(forumTopic_id):
    forumTopic = ForumTopic.query.get(forumTopic_id)
    if forumTopic is None:
        return jsonify({'msg': 'ForumTopic not found'}), 404
    
    topicResponses = TopicResponse.query.filter_by(forumtopic_id=forumTopic_id).all()
    return jsonify({
        'msg': 'ok',
        'forumTopic': {
            'id': forumTopic.id,
            'forumTopicTittle': forumTopic.forumTopicTittle,
            'forumTopicText': forumTopic.forumTopicText,
            'author': {
                'petStar': forumTopic.user_relationship.petStar,
                'email': forumTopic.user_relationship.email
            }
        },
        'topicResponse': [{
            'id': topicResponse.id,
            'topicResponseText': topicResponse.topicResponseText,
            'author': {
                'petStar': topicResponse.user_relationship.petStar,
                'email': topicResponse.user_relationship.email
            }
        } for topicResponse in topicResponses]
    }), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
