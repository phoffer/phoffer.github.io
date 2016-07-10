function formSocialMediaUrl(socialNetwork, username) {
  switch (socialNetwork) {
    case 'Bitbucket':
      return 'https://bitbucket.org/' + username;
    case 'Deviantart':
      return 'https://' + username + '.deviantart.com';
    case 'Facebook':
      return 'https://www.facebook.com/' + username;
    case 'Flickr':
      return 'https://www.flickr.com/' + username;
    case 'Github':
      return 'https://github.com/' + username;
    case 'Instagram':
      return 'https://www.instagram.com/' + username;
    case 'Linkedin':
      return 'https://www.linkedin.com/in/' + username;
    case 'Pinterest':
      return 'https://www.pinterest.com/' + username;
    case 'Soundcloud':
      return 'https://soundcloud.com/' + username;
    case 'Twitch':
      return 'http://www.twitch.tv/' + username;
    case 'Twitter':
      return 'https://twitter.com/' + username;
    case 'Vimeo':
      return 'https://vimeo.com/' + username;
    case 'Youtube':
      return 'https://www.youtube.com/user/' + username;
  }
}
function revealSocialLink(socialNetwork) {
  var usernameProp = socialNetwork.toLowerCase() + 'Username';
  console.log(window.__themeCfg[usernameProp]);
  if (window.__themeCfg[usernameProp]) {
    $('.social-link.' + socialNetwork.toLowerCase()).removeClass('hidden');
    $('.social-link.' + socialNetwork.toLowerCase()).attr('href', formSocialMediaUrl(socialNetwork, window.__themeCfg[usernameProp]));
  } else {
    console.warn('To add a ' + socialNetwork + ' profile link to your blog, put "\x3Cscript\>window.__themeCfg.' + usernameProp + ' = \'my' + socialNetwork + 'Username\';\x3C/script\>" in Ghost code injection!');
  }
}
function revealSocialLinks() {
  revealSocialLink('Bitbucket');
  revealSocialLink('Deviantart');
  revealSocialLink('Facebook');
  revealSocialLink('Flickr');
  revealSocialLink('Github');
  revealSocialLink('Instagram');
  revealSocialLink('Linkedin');
  revealSocialLink('Pinterest');
  revealSocialLink('Soundcloud');
  revealSocialLink('Twitch');
  revealSocialLink('Twitter');
  revealSocialLink('Vimeo');
  revealSocialLink('Youtube');
  $('.social-link:not(.hidden)').first().addClass('no-border-left');
}

$(document).ready(function() {
  console.log('something');
  $(revealSocialLinks);
});


