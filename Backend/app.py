from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = '1234567890'
jwt = JWTManager(app)
CORS(app)

db__config = {
    'host':'localhost',
    'user':'root',
    'password':'',
    'database':'just-watch-database'
}

connector = mysql.connector.connect(**db__config)
cursor = connector.cursor(dictionary=True)


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':    
        try:    
            data = request.get_json()
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            existing_user = cursor.fetchone()

            data = {
                    'status':'error',
                    'message':'Email already exists'
                    }

            if existing_user:
                return jsonify(data), 409

            cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
            connector.commit()

            return jsonify({
                'status':'success',
                'message':'User registered successfully'
            }), 201

        except Exception as e:
            print("error while receiving data", str(e))
            return jsonify({
                'status':'error',
                'message':'error occured while request processing'
            }), 500

@app.route('/Login', methods=['POST'])
def Login():
    if request.method == 'POST':
        try:
            data = request.get_json()
            username = data.get("username")
            password = data.get("password")
            print(username, password)
            cursor.execute("SELECT * FROM users where username = %s ", (username,))
            user = cursor.fetchone()
            

            print(user)

            if (user != None and user.get('Password') == password):
                user_email = user.get('Email')
                access_token = create_access_token(identity={"username":username, "email":user_email})
                print("about to prepare data")
                data = {
                    'satus':'successfull',
                    'token': access_token,
                    'message':'Logged In successfully',
                    'username':username,
                    'loggedIn': True,
                    'email':user.get('Email')
                }
                print("data preparation done , ready to return data")

                return jsonify(data), 201
            else:
                print("at 79")
                return jsonify({
                    'status':'failed',
                    'message':"user doesn't exist"
                }), 500
        except Exception as e:
            print("Error while receiving data:". str(e))
            return jsonify({
                'status':'failed',
                'message':'Unexpected error occured!'
            })
        

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as = current_user), 200
    

    

if __name__ == '__main__':
    app.run(debug=True)