var store = [{
        "title": "Getting Ghost onto Github Pages",
        "excerpt":"Ghost seems great. Github Pages seem great. Getting those two together seems so incredibly simple. Oh but guess what, Buster isn’t maintained anymore and it   fails to generate the static version of an basic Ghost blog.Let’s assume that you have a Ghost blog working locally already, and now you’re just trying to deploy to GH pages.There’s a fork of Buster that fixes this problem. Install Buster from that fork (use the –update flag if you already have Buster installed):pip install https://github.com/thinkamabob/buster/archive/master.zip --upgrade  buster generate --domain=https://code.phoffer.com/  Now you can host your blog on Github Pages. Congratulations!","categories": [],
        "tags": [],
        "url": "https://code.phoffer.com/2016/02/20/getting-ghost-onto-github-pages.html",
        "teaser":null},{
        "title": "Smoothly upgrade did_you_mean gem for Ruby 2.3",
        "excerpt":"A lot of Rails apps are using the gem did_you_mean to help during development. Most of these apps are probably going to run into an issue when upgrading to Ruby 2.3, which pulled the gem into Ruby core.A graceful method of upgrading Ruby is to update the Gemfile version of did_you_mean to 0.10.0 if it wasn’t already. That version was released 4 months before Ruby 2.3, so some apps may already be using it. Version 0.10.0 works with both 2.3 and previous versions.Fix came from this Github issue","categories": [],
        "tags": ["ruby"],
        "url": "https://code.phoffer.com/2016/03/04/smoothly-upgrade-did-you-mean-gem-for-ruby-23.html",
        "teaser":null},{
        "title": "Force git to treat Keynote files as binary",
        "excerpt":"I was recently putting together a repo for presentations I’ve given, and I kept running into an annoying issue. Git would treat my Keynote files as a directory, which ends up looking like this:$ git status...    new file:   2016_06_07-URUG.key/Data/st-ED415AB1-F3E3-40E7-AE3C-62C8F48D61F2-1769.jpg    new file:   2016_06_07-URUG.key/Data/st-FA2A3A03-7617-4164-9E65-1304161A58D5-2058.jpg    new file:   2016_06_07-URUG.key/Metadata/BuildVersionHistory.plist    new file:   2016_06_07-URUG.key/Metadata/DocumentIdentifier    new file:   2016_06_07-URUG.key/Metadata/Properties.plist    new file:   2016_06_07-URUG.key/preview-micro.jpg    new file:   2016_06_07-URUG.key/preview-web.jpg    new file:   2016_06_07-URUG.key/preview.jpg...I just want the files there as binary, so that anyone can download them if they like.I tried a few different things, including a .gitattributes file with *.key binary, using different versions of git, and even different versions of OS X (el Capitan and Sierra).In the end, the problem was from when I had saved the presentations. The hide file extension option in Keynote’s save dialog was the problem. De-selecting that option is all it took for it to work as I wanted (and as I think most people would expect).","categories": [],
        "tags": ["osx"],
        "url": "https://code.phoffer.com/2016/09/21/force-git-to-treat-keynote-files-as-binary.html",
        "teaser":null}]
