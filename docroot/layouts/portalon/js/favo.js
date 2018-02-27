
function favorites(title,url){ 
  if(document.all){ // ie
     window.external.AddFavorite(url, title);  }
  else if(window.sidebar){ // firefox 
     window.sidebar.addPanel(title, url, "");  }
  else if(window.opera && window.print){ // opera 
     var obj = document.createElement('a');
     obj.setAttribute('href',url);
     obj.setAttribute('title',title);
     obj.setAttribute('rel','sidebar');
     obj.click();  }  
}
