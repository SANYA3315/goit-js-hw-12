import{a as L,S as b,i as g}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const w="53367958-e4d72e9b7abbbffbba381cf2e",B="https://pixabay.com/api/",A=15,E=L.create({baseURL:B,timeout:1e4});async function S(e,t=1){try{return(await E.get("/",{params:{key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:A,page:t}})).data}catch(s){throw s}}const a={gallery:document.querySelector(".js-gallery"),loader:document.getElementById("loader"),loadMoreBtn:document.getElementById("load-more")},p=new b(".js-gallery a",{captionsData:"alt",captionDelay:250});function M({webformatURL:e,largeImageURL:t,tags:s,likes:n,views:r,comments:o,downloads:l}){return`<li class="gallery-item">
    <a href="${t}" class="gallery-link">
      <img src="${e}" alt="${s}" loading="lazy" />
    </a>
    <div class="gallery-descr">
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Likes</p>
        <p class="gallery-descr-value">${n}</p>
      </div>
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Views</p>
        <p class="gallery-descr-value">${r}</p>
      </div>
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Comments</p>
        <p class="gallery-descr-value">${o}</p>
      </div>
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Downloads</p>
        <p class="gallery-descr-value">${l}</p>
      </div>
    </div>
  </li>`}function P(e){if(!Array.isArray(e)||e.length===0)return;const t=e.map(M).join("");a.gallery.insertAdjacentHTML("beforeend",t),p.refresh()}function q(){a.gallery.innerHTML="",p.refresh()}function R(){a.loader.classList.remove("is-hidden")}function I(){a.loader.classList.add("is-hidden")}function $(){a.loadMoreBtn.classList.remove("is-hidden")}function c(){a.loadMoreBtn.classList.add("is-hidden")}const h=a.gallery,O=a.loadMoreBtn,y=document.getElementById("search-form"),x=y.querySelector('input[name="search-text"]');let m="",i=1,d=0;y.addEventListener("submit",_);O.addEventListener("click",j);function u(e){g.info({title:"",message:e,position:"topRight"})}function f(e){g.error({title:"Error",message:e,position:"topRight"})}async function _(e){e.preventDefault();const t=x.value.trim();if(!t){u("Please enter a search query.");return}m=t,i=1,d=0,q(),c(),await v(!1),y.reset()}async function j(){i+=1,await v(!0)}async function v(e){try{R();const t=await S(m,i);if(!t||!Array.isArray(t.hits)){f("No server response.");return}const{hits:s,totalHits:n}=t;if(i===1&&s.length===0){c(),u("Sorry, there are no images matching your search query. Please try again!");return}s.length>0&&P(s),d=n,h.querySelectorAll(".gallery-item").length<d?$():(c(),u("We're sorry, but you've reached the end of search results.")),e&&s.length>0&&C()}catch{f("Something went wrong. Please try again later.")}finally{I()}}function C(){const e=h.querySelector(".gallery-item");if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
