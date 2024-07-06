from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
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

    
    

    

if __name__ == '__main__':
    app.run(debug=True)