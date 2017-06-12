# Bare auth test for react integration

This test uses [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth) instead of the previous custom solution to handle user authentication.

### note on getting started
Once you `bundle install` you will still need to `rails db:create` so PG can create a new DB.

## Setting up the first user
1. Start the Rails server with `rails s`

2. Load Postman and `POST` a new user to `lvh.me:3000/auth` with the body parameters:

```
raw JSON(application/json)

{
	"email": "firstuser@example.com",
	"password": "password",
	"password_confirmation": "password",
	"confirm_success_url": "nil"
}
```

The server will return a 500 error because there is not template, but the user is created.

3. Open the console and confirm the user

```
>> u = User.first
>> u.update_attributes(confirmed_at: Time.now)
```

4. With the user confirmed you can sign in with Postman by `POST`ing to `lvh.me:3000/auth/sign_in` with the username and password in the body. In the headers returned you will need to include the following five with each request:

```
access-token
client
expiry
token-type
uid
```

**Note** The `access-token` and `expiry` chnage with each request, but the other tokens are stable

5. Test by changing the password. `PATCH` to `lvh:3000/auth/password`. Include the five items from above in the header and in the body include:

```
{
	"password": "passwords",
	"password_confirmation": "passwords"
}
```

6. To continue testing update the headers with the newly returned values. You can see all the end points for users with `rake routes`

## Testing Notes
To test the notes function use the user you created in the first step and the most recent tokens.
1. `POST` to `api.lvh.me:3000/notes` with the updated token info and the following in the body:

```
{
	"title": "some note",
	"created_by": "1"
}
```

2. To test the index `GET` from `api.lvh.me:3000/notes` with the updated token

The rest of the endpoints can be seen with `rake routes`