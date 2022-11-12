//module
let http = require('http');
let fs = require('fs');
let url = require('url');

//function
/** 
 * HTML 틀
 * @param {String} title // 제목
 * @param {*} list // 파일리스트
 * @param {*} body // 본문
 * @returns HTML의 전체적인 틀
 */
function templateHTML(title,list,body){
    return `
        <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${body}
        </body>
        </html>`;
}
/**
 * 파일리스트를 html형식에 맞게 수정
 * @param {Array} filelist //파일리스트
 * @returns 파일리스트의 html 틀
 */
function templateList(filelist){
    let list = "<ul>";
    let i = 0;
    while (i < filelist.length) { //파일리스트의 길이만큼 반복
      let filename = filelist[i].split("."); //확장자를 기준으로 split
      list += `<li><a href="/?id=${filename[0]}">${filename[0]}</a></li>`;
      i++;
    }
    list += "</ul>";
    return list;
}

//웹서버 생성
let app = http.createServer(function(request,response){//http.Server 개체를 만듭니다.
    let _url = request.url; //path와 queryString
    let queryData = url.parse(_url, true).query; //queryString
    let title = queryData.id; //queryString.id 
    let pathname = url.parse(_url, true).pathname; //path
    
    if(pathname === '/'){ //path가 /일때
        fs.readdir('Data',function(err,filelist){ //Data 하위 dir을 배열의 형태로 반환
            list = templateList(filelist); //파일리스트의 html 틀
            console.log(_url);
            if (_url === "/") {//루트 파일일때
                title = "Welcome";
                fs.readFile( `Welcome/${title}.txt`, "utf8", function (err, description) {
                    let template = templateHTML(title,list,`<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200); //http 응답 헤더를 작성
                    response.end(template); //응답을 종료하는 메소드
                  }
                );
            }else{
                fs.readFile(`Data/${title}.txt`, "utf8", function (err, description) {
                    let template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                });
            }
        });
    } else { // path가 /(root)가 아닐때 즉 잘못된 url일때
        response.writeHead(404); //http 응답 헤더를 작성
        response.end('Not Found'); //응답을 종료하는 메소드
    }
});
app.listen(3000); //서버연결(port 번호)