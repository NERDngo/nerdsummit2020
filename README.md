# NERD Summit Website
This is the codebase for the NERD Summit website: https://nerdsummit.org/ 

# STRUCTURE

The site is essentially a one-page website with most of the content in `index.html` and with `code.html` being the Code of Conduct page. 

The sessions section is built with Javascript via the `/js/sessions.js` file which gets the sessions data from `data/sessions.json`. This is currently in the process of being changed to get data from a Google Sheet via a JSON feed.  See BACKEND section.

# FRONTEND

Starting with the 2020 version of the site, Gulp has been configured to use Sass and PostCSS. In order to use this, install everything by opening a terminal window, navigating to the `nerdsummit2020` folder on your machine, and running `npm install`. To run the Gulp command, run `gulp watch`.

CSS classes should be named by using the BEM (Block, Element, Modifier) methodology. To learn more, [Get BEM](http://getbem.com/) give an overview of the methodology, ways to implement it, and answers frequently asked questions.

# BACKEND

See `/backend/README.md` for how the backend works. 

# WORKFLOW AND DEPLOY

Pushing the master branch automatically deploys the code to the Github site: https://nerdsummit.org/

Create and push a branch with your code, then create a pull request. 

# ABOUT NERD (New England Regional Developers)

NERD creates positive and supportive learning opportunities for people who work, or want to work in web and related technology. Too many smart, passionate people have been traditionally excluded from tech careers, and we're changing that.

NERD runs an annual conference in March each year called NERD Summit, hosted at UMass Amherst. 

The Organizers of NERD Summit can be contacted at contact@nerdsummit.org.

See also: https://nerd.ngo/

Please consider supporting NERD by sponsporing NERD Summit: https://nerdsummit.org/#sponsor or by donating to NERD: https://www.mightycause.com/organization/Nerd

Thank you!  
