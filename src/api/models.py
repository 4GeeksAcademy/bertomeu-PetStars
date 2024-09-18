from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False) 
    userPhoto = db.Column(db.String(250), unique=False, nullable=True)   
    petStar = db.Column(db.String(80), unique=False, nullable=False)
    breed = db.Column(db.String(80), unique=False, nullable=True)
    birthDate = db.Column(db.Date, unique=False, nullable=True)
    hobbies = db.Column(db.String(200), unique=False, nullable=True)
    user_post = db.relationship('Post', back_populates='user_relationship')
    user_commentpost = db.relationship('CommentPost', back_populates='user_relationship')
    user_forumtopic = db.relationship('ForumTopic', back_populates='user_relationship')
    user_topicresponse = db.relationship('TopicResponse', back_populates='user_relationship')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "userPhoto": self.userPhoto,
            "petStar": self.petStar,
            "breed": self.breed,
            "birthDate": self.birthDate,
            "hobbies": self.hobbies,
            # do not serialize the password, its a security breach
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)    
    postPhoto = db.Column(db.String(250), unique=False, nullable=False)
    postText = db.Column(db.String(100), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_relationship = db.relationship('User', back_populates='user_post')
    response_post = db.relationship('CommentPost', back_populates='post_relationship')

    def __repr__(self):
        return f'<Post id {self.id} from user id {self.user_id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "postphoto": self.postPhoto,
            "posttext": self.postText,
        }

class CommentPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)   
    commentPostText = db.Column(db.String(200), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_relationship = db.relationship('User', back_populates='user_commentpost')
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    post_relationship = db.relationship('Post', back_populates='response_post')

    def __repr__(self):
        return f'<Comment on post id {self.id} by user id {self.user_id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "commentposttext": self.commentPostText,
        }


class ForumTopic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    forumTopicTittle = db.Column(db.String(80), unique=False, nullable=False)
    forumTopicText = db.Column(db.String(200), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_relationship = db.relationship('User', back_populates='user_forumtopic') 
    response_forumtopic = db.relationship('TopicResponse', back_populates='forumtopic_relationship', foreign_keys='TopicResponse.forumtopic_id')

    def __repr__(self):
        return f'<forum topic id {self.id} from user id {self.user_id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "forumtopictittle": self.forumTopicTittle,
            "forumtopictext": self.forumTopicText,
        }

class TopicResponse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topicResponseText = db.Column(db.String(200), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_relationship = db.relationship('User', back_populates='user_topicresponse')
    forumtopic_id = db.Column(db.Integer, db.ForeignKey('forum_topic.id'))
    forumtopic_relationship = db.relationship('ForumTopic', back_populates='response_forumtopic')

    def __repr__(self):
        return f'<Forum topic comment id {self.id} by user id {self.user_id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "topicresponsetext": self.topicResponseText,
        }

