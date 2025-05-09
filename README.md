# chrome.security

This website is a glorified list of links; a collection of some of the things we've been working on lately; a little home for Chrome Security on the web :)

## How to add a new blog post

Are you a member of Chrome Security who has recently published a blog post? First of all: congrats!

### Converting to markdown

Posts can be added to the website in Markdown format. To convert your published blog post to markdown format, you can follow these steps:

1. Download the blog post to your local machine:
```
wget -O blogpost.html https://example.com/link-to-blog-post
```
2. Use `pandoc` to automatically convert it to markdown format.
```
pandoc -f html -t markdown --markdown-headings=atx --columns=80 -o blogpost.md blogpost.html
```
3. Edit the `blogpost.md` file in your favorite editor, as appropriate, and then use it in Step 5 below.

### Adding the post to the website

Add your post to our team website by:

1. `git clone`ing this repo
2. Under the `_posts` directory you'll find `template.md`. Save a copy of this file with a filename in the following format: `YYYY-MM-DD-permalink.md`, where the `YYYY-MM-DD` date is the date of publication, and `permalink` is the permalink string.
4. Fill in the fields. You can delete the `excerpt` line, unless you want a custom excerpt.
5. Paste the contents of the markdown file generated above (`blogpost.md`) under the `---` on line 8. This will be used to generate an excerpt for the link.
7. Save it! Commit it! Bop it! Pull request it!

### Previewing changes locally (optional)

To preview your changes locally, you will need to install and run [Jekyll](https://jekyllrb.com/docs/), which requires Ruby 2.5.0 or higher. This comes with the standard fun and excitement of wrangling with modern web dev environments and their many dependencies, so this part is completely optional.

Open up the cloned directory in your command line tool of choice, and run 

1. `gem install bundler jekyll` (if you don't already have Jekyll installed)
2. `bundle install` (to make sure all dependencies are there)
3. `bundle exec jekyll serve` 
4. Browse to `localhost:4000` to see a preview.
