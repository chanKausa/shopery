class AuthPresenter {
    static userDetails(data) {
        return {
            _id: data._id,
            user_name: data.name,
            email_id: data.email_id,
            settings: data.settings,
        };
    }
}

module.exports = AuthPresenter;