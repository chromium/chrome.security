# chrome.security

This website is a glorified list of links; a collection of some of the things we've been working on lately; a little home for Chrome Security on the web :)

## How to add a new blog post

Are you a member of Chrome Security who has recently published a blog post? First of all: congrats!

Add your post to our team website by:

1. `git clone`ing this repo
2. Under the `_posts` directory you'll find `template.md`. Fill in the fields (except `excerpt`, unless you want a custom excerpt).
3. **Save as** with a filename in the following format: `YYYY-MM-DD-permalink.md`, where the `YYYY-MM-DD` date is the date of publication, and `permalink` is the permalink string.
4. Convert the body of the blog post to markdown and paste the body of the post under the `---` on line 8. This will be used to generate an excerpt for the link.
5. Save it! Commit it! Bop it! Pull request it!

To preview your changes locally, you will need to run [Jekyll](https://jekyllrb.com/docs/). Just open up the cloned directory in your command line tool of choice, run 

1. `gem install bundler jekyll`  (if you don't have Jekyll installed)
2. `bundle exec jekyll serve` 
3. then browse to `localhost:4000`.
