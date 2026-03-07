import os
from flask import Flask
from flask_restx import Api, Resource
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

api = Api(
    app, 
    version='1.0', 
    title='Let\'s Study SaaS API',
    description='API for learning materials and practice progress tracking',
    doc='/swagger'
)

ns = api.namespace('learning', description='Learning operations')

@ns.route('/hello')
class HelloWorld(Resource):
    def get(self):
        """Standard hello world check"""
        return {'status': 'success', 'message': 'Welcome to StudySaaS API'}

@ns.route('/workbook/<string:topic>')
@ns.doc(params={'topic': 'Topic of the workbook (react, flask, supabase)'})
class Workbook(Resource):
    def get(self, topic):
        """Retrieve workbook content for a specific topic"""
        # Placeholder content for now
        content = {
            'react': {
                'title': 'React Fundamentals',
                'lessons': ['Components', 'Hooks', 'State Management']
            },
            'flask': {
                'title': 'Flask Backend API',
                'lessons': ['Routes', 'Controllers', 'Swagger UI Integration']
            }
        }
        return content.get(topic.lower(), "Topic not found"), 200 if topic.lower() in content else 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
