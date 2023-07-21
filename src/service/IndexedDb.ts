import {Shop} from '../type/index'
export function openDb() {
    return new Promise((resolve, reject) => {

        let request = window.indexedDB.open("HyperStore", 1);
        
        request.onerror = e => {
            console.log('Error opening db', e);
            reject('Error');
        };
    
        request.onsuccess = (e: any) => {
            resolve(e.target.result);
        };
        
        request.onupgradeneeded = (e: any) => {
            console.log('onupgradeneeded');
            let db = e.target.result;
            let objectStore = db.createObjectStore("stores", { keyPath:'id' });
        };
        });
}

export async function addStoresToDb(shopList: Shop[]): Promise<void> {
    let db: any = await openDb()
    const tx = db.transaction(["stores"], "readwrite");

	return new Promise((resolve, reject) => {    
        let trans = db.transaction(['stores'],'readwrite');
        trans.oncomplete = (e: any) => {
            resolve();
        };
  
        shopList.forEach(sl => {
            let request = tx.objectStore("stores").add(sl);
        })
    })
}

export async function getStoresFromDb() : Promise<Shop[]> {
    let db: any = await openDb()
	return new Promise((resolve, reject) => {

		let trans = db.transaction(['stores'],'readonly');
		trans.oncomplete = (e: any) => {
			resolve(stores);
		};
		
		let store = trans.objectStore('stores');      
		let stores: any = [];
		
		store.openCursor().onsuccess = (e: any) => {
			let cursor = e.target.result;
			if (cursor) {
				stores.push(cursor.value)
				cursor.continue();
			}
		};

	});
}