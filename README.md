# cse134B-crud-demo
CRUD demo application using Firebase and Vue.JS 

Demo : https://cse134b-demo.firebaseapp.com/

### 1. Setup firebase firebase 

```
$ firebase init
```
Choose `Database: Deploy Firebase Realtime Database Rules` and default `database.rules.json` file and `public` directory.
Now two more files will be create. Set read and write permission to `true` in `database.rules.json` for time being. This allows unauthorized users to connect to the database. 

firebase.json
```
{
  "database": {
    "rules": "database.rules.json"
  },
  "hosting": {
    "public": "public"
  }
}
```

database.rules.json 
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```


### 2. Lets create basic bootstrap page `index.html` in `public` directory.

```
<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>CSE 134B demo</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <link rel="stylesheet" href="css/styles.css">
   </head>
   <body>
      <div id="app">
         <header>
            <table>
               <tbody>
                  <tr>
                     <td id="td1"></td>
                     <td id="td2"></td>
                     <td id="td3"></td>
                     <td id="td4"></td>
                  </tr>
               </tbody>
            </table>
         </header>
         <div class="container">
            <br/>
            <h1 class="text-center">Sample CRUD using Firebase and Vue.JS</h1>
            <br/>
         </div>
         <div class="jumbotron">
            <div class="container">
               <h2>Manage playlists</h2>
               <p>You can <span>C</span>reate a new playlist by entering details below and hitting submit, <span>R</span>ead all the playlists on load and updations, <span>U</span>pdate the numbers of songs in a playlist by hitting update button and <span>D</span>elete a playlist by hitting delete button.</p>
               <form>
                  <div class="row">
                     <div class="col-md-3">
                        <div class="form-group">
                           <label for="name">Name:</label>
                           <input type="text" class="form-control" id="name">
                        </div>
                     </div>
                     <div class="col-md-3">
                        <div class="form-group">
                           <label for="theme">Theme:</label>
                           <input type="text" class="form-control" id="theme">
                        </div>
                     </div>
                     <div class="col-md-3">
                        <div class="form-group">
                           <label for="theme">Image Url:</label>
                           <input type="text" class="form-control" id="url">
                        </div>
                     </div>
                     <div class="col-md-3">
                        <div class="form-group">
                           <label>&nbsp;</label>
                           <input type="submit" class="form-control btn btn-primary btn-md" id="submit"> 
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
         <div class="container">
            <div class="row">
               <div class="col-sm-6 col-md-4">
                  <div class="thumbnail">
                     <img src="img.png" class="img-responsive" alt="Responsive image" style="padding: 20px">
                     <div class="caption">
                        <h3 class="text-center">Name</h3>
                        <p class="text-center">Theme</p>
                        <p class="text-center text-info"> songs</p>
                        <div class="row">
                           <div class="col-sm-6 col-md-6">
                              <button type="button" class="btn btn-block btn-success">
                              <span class="glyphicon glyphicon-pencil"></span>  Add Song
                              </button>
                           </div>
                           <div class="col-sm-6 col-md-6">
                              <button class="btn btn-block btn-danger">
                              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>  Delete
                              </button> 
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </body>
</html>
```

and CSS 

```
table {
   width: 100%; 
   height: 5px;
}

#td1 {
	width: 25%;
	background-color: #e80b63;
}

#td2 {
	width: 25%;
	background-color: #145dcc;
}

#td3 {
	width: 25%;
	background-color: #f2ee09;
}

#td4 {
	width: 25%;
	background-color: #09f1cf;
}

span {
	font-size:1.8em;
}
```


### 3. Add Firebase, Vue, VueFire libraries and app.js (made from next step) to the `index.html`

```
      <script src="https://www.gstatic.com/firebasejs/3.7.0/firebase.js"></script>
      <script src="https://unpkg.com/vue"></script>
      <script src="https://unpkg.com/vuefire/dist/vuefire.js"></script>
      <script src="js/app.js"></script>
```

### 4. Make new JS file `js/app.js` and initialize the configuration parameters from Firebase

```
var config = {
    apiKey: "AIzaSyCOtvp223FcWEE1YtDQOLmbm5swsAsm5kk",
    authDomain: "cse134b-demo.firebaseapp.com",
    databaseURL: "https://cse134b-demo.firebaseio.com",
    storageBucket: "cse134b-demo.appspot.com",
    messagingSenderId: "314223225958"
  };

var app = firebase.initializeApp(config);
var db = app.database()
var ref = db.ref('playlists');
```

### 5. Now let us application Vue.JS to the application

```
Vue.use(VueFire);

var vm = new Vue({
	  el: "#app",
	  data: {
	    name: "",
	    theme: "",
	    url: ""
	  },
	  firebase: {
	    playlists: ref
	  }, 
	  methods: {
	    addPlaylist: function () {
	    	if (this.name.trim() && this.theme.trim() && this.url.trim()) {
	    		ref.push({
	    			"name": this.name,
	    			"theme": this.theme,
	    			"url": this.url,
	    			"songs": 0
	    		})
	    		this.name = ""
	    		this.theme = ""
	    		this.url = ""
	    	}
	    }
	  }
	});
  
```

Here we have created datamodels `name`, `theme`, `url` that we will be binding to the form elements in the next step, firebase playlist reference and a method to add an entry to the firebase database.

### 6. Now let us bind the HTML form elements to the models
```
<form @submit.prevent="addPlaylist">
   ...
            <input type="text" class="form-control" id="name" v-model="name">
   ...
            <input type="text" class="form-control" id="theme" v-model="theme">
   ...
            <input type="text" class="form-control" id="url" v-model="url">       
</form>
```

`@submit.prevent="addPlaylist"` is used to prevent the page from refreshing when submit is hit and calls `addPlayList` method.

### 7. Now lets deploy our application. Create request should work now.

### 8. Now we shall read data from Firebase database. On deploying you should be able to populate the grid table.

```
<div v-for="playlist in playlists">
   ...
         <img :src="playlist.url" class="img-responsive" alt="Responsive image" style="padding: 20px">
   ...
            <h3 class="text-center">{{playlist.name}}</h3>
            <p class="text-center">{{playlist.theme}}</p>
            <p class="text-center text-info">{{playlist.songs}} songs</p>           
   ...
</div>
```

### 9. Let us add functionality for update and delete

```
methods: {
	    removePlaylist: function (key) {
	      ref.child(key).remove();
	    },
	    ...
      ...
	    updatePlaylist: function(key, newCount) {
	    	ref.child(key).update({"songs": newCount + 1})
	    }
	  }
```

and call these methods from HTML. 

```
...
      <button type="button" class="btn btn-block btn-success" @click="updatePlaylist(playlist['.key'], playlist.songs)">
...
      <button class="btn btn-block btn-danger" @click="removePlaylist(playlist['.key'])">
```

### 10. Deploy the application

```
$ firebase deploy
```
