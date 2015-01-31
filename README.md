#  Track progress at CornerFind.com
- Where did you find it?
- I found it on CornerFind.com, baby!

# Marketplace for all baby products (e.g. clothes, toys, cribs, strollers etc.)

##Reference for collaborators: Git Team Workflow:
####On `master` branch
1. `git pull`
2. Make a new branch and switch to that branch by running `git checkout -b my_feature`

####On `my_feature` branch
3. Do your changes here
4. `git add -A` and `git commit -m "my changes"`
5. `git checkout master`

####On `master` branch
6. `git pull`
7. `git checkout my_feature`

####On `my_feature` branch
8. `git merge master`
9. RESOLVE ALL CONFLICTS <<< IMPORTANT!
10. `git add -A` and `git commit -m "merged master into my_feature"`
11. `grunt serve` to make sure your code hasn't broken the current master head
12. `git push origin my_feature`

####On Github
14. Create a pull request
15. Notify someone that you have created a pull request
16. Don't branch or work on another feature until the request has been merged into master.

####On your local computer
17. `git checkout master`

####On `master`
18. `git pull`
19. Repeat the steps

####Please keep this workflow here for reference
