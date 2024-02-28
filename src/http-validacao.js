import chalk from "chalk"

function extraiLinks (arrLinks) {
  return  arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

 async function checaStatus (listaUrls) {
    const arrStatus = await Promise
    .all(
        listaUrls.map(async(url) => {
            try {
               const response = await fetch(url)
               return ` ${response.status} ${response.statusText}`
            } catch(error) {
                return manejaErros(error)
            }
            
        }) )
        return arrStatus
}

function manejaErros (error) {
    if(error.cause.code === 'ENOTFOUND') {
     return "Link nao encontrado";
    } else {
     return "ocorreu algum erro";
    }
 
}
  async function listaValidada (listaDeLinks) {
   const links = extraiLinks(listaDeLinks);
   const status =  await checaStatus(links);
   
   return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice]
   }))
}
export default listaValidada;