import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    type:String,
    default:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLepr7Lc3+Dn6erg4uO3vL/X2tvHy83Q09WzuLvr7e7Axce9wsTU19m6v8JF5F41AAADRUlEQVR4nO2a25rjIAiAPWCi5vT+bztJ02633WxEEnAu+O/mav4PKVHAGEVRFEVRFEVRFEVRFMUYGMAE70MwAK1ddgBCGpcub3RLnE1zLwAfs3P2D865JYWmXtAv9i+jF3lsp7UqHRjt8WqkBSYeG+1aOTWwAp//E6aX1hTEndKp0Y6XDRak8zA96SWtIKKcRGOFjNPDSsxpxiqtiGV7hZNdhJyWGikXJdKqIqF2K5Fkr3OytuNXgrFWys3sUr5SaWNgdqoP1BYq7qyqd2IvC7U/vSfMdb2jOLmR9fwoab7Bmuq007OO8wsIEzFSnHfjgehkWZOKdnq8RaGnSmW+pEK9Fo5hlDp76Z3DVz7pUq5XKZW6V4oz0eklgVGqpzoxFk8TqBWd80UzUKVGTinSxXOF85mMbgF94VgbVcRrguN9Y9HOb2KVgpEUKOaHO6kocLc4hkyQYm9REYq6Y1YyhFRnfh9vQHVV4PzuvRiqWp5roESGNKEu1zvultkDmKsOUKi9P1R083i/eh+g+xwyXfQnyLog6oSdOvBXqC+rcl7JFIMPys+tBlNkmE+HyK4THtY+rczZ5arFsP3B4Ed3FC1nY8slDggxf+1wONuldkJPLdPHaVtx2bFT8r9kNQiCn1NKs18df4kRDG+gcZi2fx98n2KclrxfZ3I3jXENWDBN1rtg2HJpyY9s+sjzx9+r3Jpbg6AYGJ9Ge1gMPu2W5INIxGDoY3e0yXUoZrtx5o7XGqOIFXpHbOoZSylAQsfo0ytHpkoBPpbS6CxcY39/dm3LbmSlnenm6/r6iaNH6R2u5U4tSIX9OzTjXbkFfXeT0lYj7rlnXRgzHLJcrw/Fzcl6Lm+ZXBh8nHDt5UVtURdw3YXuEHkNoQw9sRAPTjLUkkXpuaIhtmPuq07HEKyAOhtCU7+Vw/S7+6C2QyvhtN7kqw4QvIRTbU+NPaGeVhXJXtNpvUbGS5E3kupBHyDj1+VfkL/Ayub9NRxyaEoeqdOsUBMJ0UBZ7OWKNCamg6rr1KVXKqhuO3HplQ5i9iab5g8Q5yfuZMuvG/KKFJ1iVed5U50zlQJ193sYQ3nBQ/K796KY6dnJU/zS+AYUj09RFEVRFHl+AMEWKA6VY532AAAAAElFTkSuQmCC'
  }

},{timestamps:true});


const User =mongoose.model('User',userSchema);


export default User;