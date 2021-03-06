from flask import Blueprint, jsonify, request
from starter_app.models import User, db
from flask_login import current_user, login_required
from starter_app.forms import SignUpForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route('/<currentUserId>', methods=["GET"])
@login_required
def user(currentUserId):
    response = User.query.get(currentUserId)
    return {"user": response.to_dict()}


@user_routes.route('/new', methods=["POST"])
def new_user():
    sign_up_form = SignUpForm()
    if sign_up_form.validate():
        print("aidhfakdsflksj")
        data = request.get_json()
        new_user = User(username=data["username"],
                        email=data["email"],
                        password=data["password"])
        db.session.add(new_user)
        db.session.commit()
    else:
        # errors = [value for (key, value) in sign_up_form.errors.items]
        print(sign_up_form.errors)
        return jsonify(success=False, errors=sign_up_form.errors), 400
    return jsonify('ok')


@user_routes.route('/search/<search_string>', methods=["GET"])
@login_required
def search_route(search_string):

    response = User.query.filter(
        User.username.ilike(f'%{search_string}%')).limit(15)
    print('-------=========----------=========-----------', response)
    user_list = [user.username for user in response]
    return jsonify(user_list)
