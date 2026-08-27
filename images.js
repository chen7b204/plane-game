export const easeLinear = t => t;
export const easeInQuad = t => t*t;
export const easeOutQuad = t => t*(2-t);
export const easeInOutQuad = t => t<0.5 ? 2*t*t : -1+(4-2*t)*t;
export const easeOutCubic = t => 1-Math.pow(1-t,3);
export const easeOutBack = t => {
  const c1 = 1.70158, c3 = c1+1;
  return 1 + c3*Math.pow(t-1,3) + c1*Math.pow(t-1,2);
};
export const easeOutElastic = t => {
  if(t===0||t===1) return t;
  const c4 = (2*Math.PI)/3;
  return Math.pow(2,-10*t)*Math.sin((t*10-0.75)*c4)+1;
};
// 图片加载器：预加载贴图，支持 drawImage + 矢量 fallback
export class ImageLoader {
  constructor(){
    this.images = new Map();   // key: 名称, value: HTMLImageElement|null
    this.loaded = false;
  }
  get(key){ return this.images.get(key) || null; }
  async loadAll(map){
    const entries = Object.entries(map);
    const tasks = entries.map(async ([key, url])=>{
      try{
        const img = await this._loadOne(url);
        this.images.set(key, img);
        console.log('✓ 贴图:', key, img.width+'×'+img.height);
      }catch(e){
        console.warn('✗ 贴图失败（使用矢量占位）:', key, '-', url);
        this.images.set(key, null);
      }
    });
    await Promise.all(tasks);
    this.loaded = true;
    const ok = [...this.images.values()].filter(Boolean).length;
    console.log(`贴图加载完成：${ok}/${entries.length}`);
  }
  _loadOne(url){
    return new Promise((resolve, reject)=>{
      const img = new Image();
      img.onload = ()=> resolve(img);
      img.onerror = ()=> reject(new Error(url));
      img.src = url;
    });
  }
}