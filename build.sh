npm run build

git branch -D gh-pages
git checkout -b gh-pages
git pull origin gh-pages

# remove all folder except folder dist
rm -rf $(ls | grep -v dist)

cp -r dist/* .

rm -rf dist

git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
git checkout -
