# chrome.security

This website is a glorified list of links; a collection of some of the things we've been working on lately; a little home for Chrome Security on the web :)

## How to add a new blog post

Are you a member of Chrome Security who has recently published a blog post? First of all: congrats!

Add your post to our team website by:

1. `git clone`ing this repo
2. Under the `_posts` directory you'll find `template.md`. Save a copy of this file with a filename in the following format: `YYYY-MM-DD-permalink.md`, where the `YYYY-MM-DD` date is the date of publication, and `permalink` is the permalink string.
4. Fill in the fields. You can delete the `excerpt` line, unless you want a custom excerpt.
5. Convert the body of the blog post to markdown and paste the body of the post under the `---` on line 8. This will be used to generate an excerpt for the link.
6. Save it! Commit it! Bop it! Pull request it!

### Previewing changes locally (optional)

To preview your changes locally, you will need to install and run [Jekyll](https://jekyllrb.com/docs/), which requires Ruby 2.5.0 or higher. This comes with the standard fun and excitement of wrangling with modern web dev environments and their many dependencies, so this part is completely optional.

Open up the cloned directory in your command line tool of choice, and run 

1. `gem install bundler jekyll` (if you don't already have Jekyll installed)
2. `bundle install` (to make sure all dependencies are there)
3. `bundle exec jekyll serve` 
4. Browse to `localhost:4000` to see a preview.
