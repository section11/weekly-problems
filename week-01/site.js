// Grab the members element
var members = document.getElementById('members');
// Diagnostic variable to hold the event target in the global scope, oustide the event-handler
// function:
var target;

// Listen for a click event on #members, rather than adding a click handler to each and every
// <a> element. This is called event bubbling:
members.addEventListener('click', function(e) {
  // Placeholder variables assigned in the `if` block below; life would be better with `let`
  var username, request_url;
  // Grab the content template from the HTML;
  // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
  var template = document.getElementById('member');
  // Also grab a reference to the `<blockquote>` element where the data will go:
  var profile = document.getElementById('profile');

  // Diagnostic: this will let you play with the event.target object in the console and see what
  // properties and methods it responds to.
  target = e.target;
  
  // We're only interested in clicks on `<a>` elements:
  if (e.target.nodeName.toLowerCase() == 'a') {
    // Don't let the web browser follow the link
    e.preventDefault();
    // Diagnostic: log the clicked `<a>` element's `href` value
    console.log(e.target.href, 'clicked');

    // https://github.com/<username>. The full URL is a string at `e.target.href`:
    username = e.target.href.split("/")[3];

    // Diagnostic: log the username value
    console.log('Username value:', username);

    // Append that chunk onto the GitHub API URL, `https://api.github.com/users/<username>`:
    request_url = 'https://api.github.com/users/' + username;

    // Diagnostic: log the request URL value
    console.log('Request URL value:', request_url);

    // Docs:
    //   - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    //   - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    fetch(request_url)
      .then(function(data) {
        // Parse the returned data as JSON:
        return data.json();
      })
      .then(function(profile_json) {
        // Diagnostic; output the login value
        console.log('Login', profile_json.login);
     	
	//Check to see if there are existing child nodes, from a previous record append. 
	//If so....
	if(profile.hasChildNodes()){
	  // ....keep removing the first child node untill
          // there are none left;
	  while(profile.hasChildNodes()){
	    profile.removeChild(profile.firstChild);
	  }
	}
  	var clone = document.importNode(template.content, true);
	if(profile_json.name === null){
	  clone.querySelector('#name').textContent= profile_json.login;
	}else{
	  clone.querySelector('#name').textContent = profile_json.name;
	}
	clone.querySelector('#avatar_url').src = profile_json.avatar_url;
	clone.querySelector('#public_repos').textContent = profile_json.public_repos;
	// append it to the profile `<blockquote id="profile">`
     	profile.appendChild(clone);
      
      });
  }
});
