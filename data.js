/*
 CC BY SA
 @license MIT
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(k,m,n){k instanceof String&&(k=String(k));for(var p=k.length,r=0;r<p;r++){var f=k[r];if(m.call(n,f,r,k))return{i:r,v:f}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(k,m,n){k!=Array.prototype&&k!=Object.prototype&&(k[m]=n.value)};
$jscomp.getGlobal=function(k){return"undefined"!=typeof window&&window===k?k:"undefined"!=typeof global&&null!=global?global:k};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(k,m,n,p){if(m){n=$jscomp.global;k=k.split(".");for(p=0;p<k.length-1;p++){var r=k[p];r in n||(n[r]={});n=n[r]}k=k[k.length-1];p=n[k];m=m(p);m!=p&&null!=m&&$jscomp.defineProperty(n,k,{configurable:!0,writable:!0,value:m})}};
$jscomp.polyfill("Array.prototype.find",function(k){return k?k:function(k,n){return $jscomp.findInternal(this,k,n).v}},"es6","es3");$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var k=0;return function(m){return $jscomp.SYMBOL_PREFIX+(m||"")+k++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var k=$jscomp.global.Symbol.iterator;k||(k=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[k]&&$jscomp.defineProperty(Array.prototype,k,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(k){var m=0;return $jscomp.iteratorPrototype(function(){return m<k.length?{done:!1,value:k[m++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(k){$jscomp.initSymbolIterator();k={next:k};k[$jscomp.global.Symbol.iterator]=function(){return this};return k};$jscomp.iteratorFromArray=function(k,m){$jscomp.initSymbolIterator();k instanceof String&&(k+="");var n=0,p={next:function(){if(n<k.length){var r=n++;return{value:m(r,k[r]),done:!1}}p.next=function(){return{done:!0,value:void 0}};return p.next()}};p[Symbol.iterator]=function(){return p};return p};
$jscomp.polyfill("Array.prototype.values",function(k){return k?k:function(){return $jscomp.iteratorFromArray(this,function(k,n){return n})}},"es6","es3");
(function(k,m,n){function p(){var a=k.Data;f.noConflict=function(){k.Data=a;return this};k.Data=f}var r=new Date;_LOG=function(a){console.log("_LOG: time[sec.ms] "+(new Date-r)/1E3+" "+a)};__isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)};__toArray=function(a){return a&&"undefined"!=typeof a?__isArray(a)?a:String(a).match(/\|/)?String(a).split("|"):String(a).split(","):[]};__onlyUnique=function(a,b,c){return c.indexOf(a)===b};var f={version:"1.48",errors:[]};"object"===
typeof module&&"object"===typeof module.exports?module.exports=f:"function"===typeof define&&define.amd&&define(f);"undefined"!==typeof k&&p();f.Object=function(a){this.options=a;this.debug=!1};f.Object.prototype={import:function(a){this.options.success=a;this.feed=f.feed({});this.feed.options=this.options;"csv"==this.options.type||"CSV"==this.options.type?this.feed.__processCSVData(this.options.source,this.options):"rss"==this.options.type||"RSS"==this.options.type?(this.options.format="xml",this.feed.__processRSSData(this.options.source,
this.options)):"kml"==this.options.type||"KML"==this.options.type?(this.options.format="xml",this.feed.__processKMLData(this.options.source,this.options)):"json"==this.options.type||"JSON"==this.options.type||"Json"==this.options.type?this.feed.__processJsonData(this.options.source,this.options):"geojson"==this.options.type||"GEOJSON"==this.options.type||"GeoJson"==this.options.type?this.feed.__processGeoJsonData(this.options.source,this.options):"topojson"==this.options.type||"TOPOJSON"==this.options.type||
"TopoJson"==this.options.type?this.feed.__processTopoJsonData(this.options.source,this.options):("jsonDB"==this.options.type||"JSONDB"==this.options.type||"JsonDB"==this.options.type||"jsondb"==this.options.type)&&this.feed.__processJsonDBData(this.options.source,this.options);return this},error:function(a){this.options.error=a;return this}};f.Import=function(a){this.options=a;this.debug=!1};f.Feed=function(a){this.options=a||{};this.debug=!1;this.options.error=function(a){f.errors.push(a)}};f.Feed.prototype=
{load:function(a){this.options.success=a;var b=this.options,c=b.source||b.src||b.url||b.ext;"undefined"===typeof b.cache&&(b.cache=!0,b.options&&"undefined"!==typeof b.options.cache&&(b.cache=b.options.cache));var d=this;c||q("Data.feed(...).load(): no source defined !",2E3);"csv"==b.type||"CSV"==b.type?this.__doCSVImport(c,b):"rss"==b.type||"RSS"==b.type?this.__doRSSImport(c,b):"kml"==b.type||"KML"==b.type?this.__doKMLImport(c,b):"json"==b.type||"JSON"==b.type||"Json"==b.type?this.__doJSONImport(c,
b):"geojson"==b.type||"GEOJSON"==b.type||"GeoJson"==b.type?this.__doGeoJSONImport(c,b):"topojson"==b.type||"TOPOJSON"==b.type||"TopoJson"==b.type?this.__doTopoJSONImport(c,b):"jsonDB"==b.type||"JSONDB"==b.type||"JsonDB"==b.type||"jsondb"==b.type?this.__doJsonDBImport(c,b):"jsonstat"==b.type||"jsonStat"==b.type||"JSONSTAT"==b.type?$.getScript("http://json-stat.org/lib/json-stat.js").done(function(a,e){d.__doLoadJSONstat(c,b)}).fail(function(a,c,d){q("'"+b.type+"' unknown format !")}):q("'"+b.type+
"' unknown format !");return this},error:function(a){this.options.error=a;return this}};f.feed=function(a){return new f.Feed(a)};f.object=function(a){return new f.Object(a)};f.import=function(a){return(new f.Object(a)).import().feed.dbtable};f.Feed.prototype.__doLoadJSONstat=function(a,b){var c=this;JSONstat(a,function(){var a=[],g=[this.Dataset(0).Dimension(0).label],e=this.Dataset(0).Dimension(1).id;for(l=0;l<e.length;l++)g.push(this.Dataset(0).Dimension(1).Category(e[l]).label);a.push(g);for(var l=
0;l<this.Dataset(0).Dimension(0).length;l++){g=[];g.push(this.Dataset(0).Dimension(0).Category(this.Dataset(0).Dimension(0).id[l]).label);for(e=0;e<this.Dataset(0).Dimension(1).length;e++)g.push(this.Dataset(0).Data([l,e]).value);a.push(g)}b.callback?b.callback(a,b):c.__createDataTableObject(a,b.type,b)})};f.Feed.prototype.__doJsonDBImport=function(a,b){_LOG("__doJsonDBImport: "+a);var c=this;b.url=a;$.getScript(a+".gz").done(function(a,g){c.__processJsonDBData(a,b)}).fail(function(d,g,e){$.getScript(a).done(function(a,
d){c.__processJsonDBData(a,b)}).fail(function(b,d,e){c.options.error&&c.options.error('"'+a+'" '+e)})})};f.Feed.prototype.__processJsonDBData=function(a,b){_LOG("__processJsonDBData:");this.dbtable=new f.Table;"string"==typeof a?(a=b.source.split(/\//).pop(),a=a.split(/\./)[0],a=eval(a)):a=b.source;this.dbtable.table=a.table;this.dbtable.fields=a.fields;this.dbtable.records=a.records;b.callback?b.callback(newData,b):"undefined"!=typeof b&&b.success&&b.success(this.dbtable)};f.Feed.prototype.__doCSVImport=
function(a,b){_LOG("__doCSVImport: "+a);var c=this;$.ajax({type:"GET",url:a,cache:b.cache,dataType:"text",success:function(a){c.__processCSVData(a,b)},error:function(c,g,e){"undefined"!=typeof b&&b.error&&b.error('"'+a+'" '+e)}})};f.Feed.prototype.__processCSVData=function(a,b){if("undefined"==typeof Papa)_LOG("__processCSVData:load csv parser!"),__this=this,$.getScript("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.2/papaparse.min.js").done(function(c,g){__this.__processCSVData(a,b)}).fail(function(a,
c,e){q("'"+b.type+"' parser not loaded !")});else{var c=Papa.parse(a,b.parser).data;if("undefined"==typeof c[0]||"undefined"==typeof c[1])return q(c),b.error&&b.error(c),!1;b.parser&&b.parser.delimiter||c[0].length==c[1].length||(_LOG("csv parser: autodetect failed"),_LOG("csv parser: delimiter = ;"),c=Papa.parse(a,{delimiter:";"}).data,c[0].length!=c[1].length&&(_LOG("csv parser: delimiter = ; failed"),_LOG("csv parser: delimiter = ,"),c=Papa.parse(a,{delimiter:","}).data,c[0].length!=c[1].length&&
(_LOG("csv parser: delimiter = , failed"),q("csv parsing error"))));c[c.length-1].length!=c[0].length&&c.pop();1==c[0].length-c[1].length&&" "==c[0][c[0].length-1]&&c[0].pop();if(b.callback)b.callback(c,b);else return _LOG("__createDataTableObject: "+(b.options?" -> "+b.options.name:"")),this.__createDataTableObject(c,b.type,b),c=a=null,!1}};f.Feed.prototype.__doRSSImport=function(a,b){_LOG("__doRSSImport: "+a);var c=this;b.format="xml";$.ajax({type:"GET",url:a,dataType:"xml",success:function(a){c.__processRSSData(a,
b)},error:function(a,c,e){"undefined"!=typeof b&&b.error&&b.error(a,c,e)}})};f.Feed.prototype.__processRSSData=function(a,b){"xml"==b.format&&($(a).find("rss").length?this.__parseRSSData(a,b):$(a).find("feed").length?q("feed not yet supported"):$(a).find("atom").length&&q("atom not yet supported"))};f.Feed.prototype.__parseRSSData=function(a,b){var c=this;"xml"==b.format&&($(a).find("rss").attr("version"),$(a).find("channel").each(function(){var d=[],g=null;$(a).find("item").each(function(){if(!g){var a=
[];g=[];for(var b=$(this).children(),c=0;c<b.length;c++){for(var f=$(this).children()[c].nodeName;a[f];)f+="*";a[f]=f;g[c]=f}d.push(g)}a=[];for(c=0;c<g.length;c++)"enclosure"==g[c]?a.push($(this).find(g[c]+":first").attr("url")||""):a.push($(this).find(g[c]+":first").text()||"");d.push(a)});c.__createDataTableObject(d,"rss",b)}))};f.Feed.prototype.__doKMLImport=function(a,b){_LOG("__doKMLImport: "+a);var c=this;b.format="xml";$.ajax({type:"GET",url:a,dataType:"xml",success:function(a){c.__processKMLData(a,
b)},error:function(a,c,e){"undefined"!=typeof b&&b.error&&b.error(a,c,e)}})};f.Feed.prototype.__processKMLData=function(a,b){"xml"==b.format&&($(a).find("kml").length?this.__parseKMLData(a,b):q("feed not kml"))};f.Feed.prototype.__parseKMLData=function(a,b){if("xml"==b.format){$(a).find("kml").attr("xmlns");var c=[],d=null;$(a).find("Document").find("Placemark").each(function(){var a=$(this).find("ExtendedData")||$(this);d||(d=[],a.find("Data").each(function(){d.push($(this).attr("name"))}),$(this).find("Point").find("coordinates")&&
d.push("KML.Point"),c.push(d));var b=[];a.find("Data").each(function(){b.push($(this).find("value").text())});$(this).find("Point").find("coordinates")&&b.push($(this).find("Point").find("coordinates").text());c.push(b)});this.__createDataTableObject(c,"kml",b)}};f.Feed.prototype.__doJSONImport=function(a,b){var c=this;$.get(a,function(a){c.__processJsonData(a,b)}).fail(function(a){"undefined"!=typeof b&&b.error&&b.error(a)})};f.Feed.prototype.__processJsonData=function(a,b){var c=null;if("string"==
typeof a)try{c=JSON.parse(a)}catch(u){this.__createDataTableObject([],"json",b)}else c=a;this.data=c;var d=[],g=[];if(c&&c.data&&c.data.columns&&c.data.rows){a=c.data.columns;c=c.data.rows;for(var e in a)g.push(a[e]);d.push(g);for(e=0;e<c.length;e++){g=[];for(var l in c[0])g.push(c[e][l]);d.push(g)}}else{c&&c.data&&(c=c.data);Array.isArray(c)||(__findAllArraysInJson=function(a){function b(a){if(Array.isArray(a))c.push(a);else if("object"===typeof a&&null!==a)for(var d in a)a.hasOwnProperty(d)&&b(a[d])}
var c=[];b(a);return c},c=__findAllArraysInJson(c)[0]);if(!c){d=[];d.push(["unknown type"]);g=a.split("\n");for(e in g)d.push([g[e]]);this.__createDataTableObject(d,"json",b);return}for(var h in c[0])if("object"==typeof c[0][h]&&null!=c[0][h])for(var f in c[0][h])if("object"==typeof c[0][h][f])for(var k in c[0][h][f])g.push(h+"."+f+"."+k);else g.push(h+"."+f);else g.push(h);d.push(g);for(e=0;e<c.length;e++){g=[];for(h in c[0])if(null===c[e][h])g.push("null");else if("object"==typeof c[e][h])for(f in c[0][h])if(c[e][h][f]&&
"object"==typeof c[e][h][f])for(k in c[0][h][f])g.push(c[e][h][f][k]);else g.push(c[e][h][f]);else g.push(c[e][h]);d.push(g)}}this.__createDataTableObject(d,"json",b)};f.Feed.prototype.__doGeoJSONImport=function(a,b){var c=this;$.get(a,function(a){c.__processGeoJsonData(a,b)}).fail(function(a){"undefined"!=typeof b&&b.error&&b.error(a)})};f.Feed.prototype.__processGeoJsonData=function(a,b){var c=null;if("string"==typeof a)try{c=JSON.parse(a)}catch(h){this.__createDataTableObject([],"json",b)}else c=
a;this.data=c;a=[];var d=[],g=[];if(c&&c.features&&c.features.length){for(f=0;f<c.features.length;f++)for(var e in c.features[f].properties)g[e]=!0;for(e in g)d.push(e);d.push("geometry");a.push(d);for(var f=0;f<c.features.length;f++){d=[];for(e=0;e<a[0].length-1;e++)"object"===typeof c.features[f].properties[a[0][e]]?d.push(JSON.stringify(c.features[f].properties[a[0][e]]||"")):d.push(c.features[f].properties[a[0][e]]||"");d.push(JSON.stringify(c.features[f].geometry));a.push(d)}}this.__createDataTableObject(a,
"json",b)};f.Feed.prototype.__processGeoJsonData_expandProperty=function(a,b){var c=null;if("string"==typeof a)try{c=JSON.parse(a)}catch(t){this.__createDataTableObject([],"json",b)}else c=a;this.data=c;a=[];var d=[],g=[];if(c&&c.features&&c.features.length){for(h=0;h<c.features.length;h++)for(var e in c.features[h].properties)if("string"===typeof c.features[h].properties[e]||"number"===typeof c.features[h].properties[e])g[e]=!0;else for(var f in c.features[h].properties[e])g[e+"."+f]=!0;for(e in g)d.push(e);
d.push("geometry");a.push(d);for(var h=0;h<c.features.length;h++){d=[];for(e=0;e<a[0].length-1;e++)f=a[0][e].split("."),2<=f.length?d.push(c.features[h].properties[f[0]][f[1]]||""):d.push(c.features[h].properties[a[0][e]]||"");d.push(JSON.stringify(c.features[h].geometry));a.push(d)}}this.__createDataTableObject(a,"json",b)};f.Feed.prototype.__doTopoJSONImport=function(a,b){var c=this;$.get(a,function(a){c.__processTopoJsonData(a,b)}).fail(function(a){"undefined"!=typeof b&&b.error&&b.error(a)})};
f.Feed.prototype.__processTopoJsonData=function(a,b){if("undefined"==typeof topojson)q("'"+b.type+"' parser not loaded !");else{var c=null;if("string"==typeof a)try{c=JSON.parse(a)}catch(g){this.__createDataTableObject([],"json",b)}else c=a;this.data=c;a=null;if(b.options&&b.options.name&&c.objects[b.options.name])a=topojson.feature(c,c.objects[b.options.name]);else for(var d in c.objects){a=topojson.feature(c,c.objects[d]);break}for(d in a.features)a.features[d].properties.id=a.features[d].id;this.__processGeoJsonData(a,
b)}};f.Feed.prototype.__createDataTableObject=function(a,b,c){a&&(this.dbtable=(new f.Table).setArray(a),"undefined"!=typeof c&&c.success?c.success(this.dbtable):_LOG("callback to call on succes is 'undefined'!"))};f.Table=function(a){a?(this.table=a.table,this.fields=a.fields,this.records=a.records):(this.table={records:0,fields:0},this.fields=[],this.records=[])};f.Table.prototype={getArray:function(){var a=[[]],b;for(b in this.fields)a[0].push(this.fields[b].id);for(b=0;b<this.records.length;b++)a.push(this.records[b]);
return a},setArray:function(a){this.fields=[];for(var b in a[0])this.fields.push({id:(a[0][b]||" ").trim(),typ:0,width:60,decimals:0});a.shift();this.records=[];for(var c in a)a[c].length==this.fields.length&&this.records.push(a[c]);this.table={records:this.records.length,fields:this.fields.length};return this},revert:function(){for(var a=[],b=this.records.length-1;0<=b;b--)a.push(this.records[b]);this.records=a;return this},reverse:function(){for(var a=[],b=this.records.length-1;0<=b;b--)a.push(this.records[b]);
this.records=a;return this},columnNames:function(){var a=[],b;for(b in this.fields)a.push(this.fields[b].id);return a},columnIndex:function(a){for(var b in this.fields)if(this.fields[b].id==a)return b;return null},column:function(a){for(var b in this.fields)if(this.fields[b].id==a)return a=new f.Column,a.index=b,a.table=this,a;return null},lookupArray:function(a,b){var c="overwrite";a&&a.key&&(c=a.calc||c,b=a.key,a=a.value);var d=[];this.column(b)||alert("'"+b+"' column not found!");this.column(a)||
alert("'"+a+"' column not found!");b=this.column(b).values();a=this.column(a).values();if("sum"==c)for(var g in b)d[String(b[g])]=(d[String(b[g])]||0)+a[g];else if("max"==c)for(g in b)d[String(b[g])]=Math.max(d[String(b[g])]||0,a[g]);else for(g in b)d[String(b[g])]=a[g];return d},lookupStringArray:function(a,b){a&&a.key&&(b=a.key,a=a.value);var c=[];this.column(b)||alert("'"+b+"' column not found!");this.column(a)||alert("'"+a+"' column not found!");b=this.column(b).values();a=this.column(a).values();
for(var d in b)c[String(b[d])]=c[String(b[d])]?c[String(b[d])]+", "+a[d]:a[d];return c},lookup:function(a,b){var c=b.value;b=b.lookup;var d=c+"_"+b;this.lookupsA&&this.lookupsA[d]||(this.lookupsA=this.lookupsA||[],this.lookupsA[d]=this.lookupArray(c,b));return this.lookupsA[d][a]||"-"},addColumn:function(a,b){if(!a.destination)return alert("'data.addColumn' no destination defined!"),null;var c=null;if(a.source){for(var d in this.fields)this.fields[d].id==a.source&&(c=d);if(null==c)return alert("'data.addColumn' source column '"+
a.source+"' not found!"),null}this.fields.push({id:String(a.destination),created:!0});this.table.fields++;if(b&&"function"==typeof b)for(var g in this.records)this.records[g].push(null!=c?b(this.records[g][c]):b(this.records[g]));else if(b&&"object"==typeof b)for(g in this.records)this.records[g].push(b[g]||0);else if(a.values&&"object"==typeof a.values)for(g in this.records)this.records[g].push(a.values[g]||0);else for(g in this.records)this.records[g].push(0);return this},addRow:function(a){if(!a||
"object"!==typeof a)return alert("'data.addRow' no options defined!"),null;var b=[],c;for(c in this.fields)b.push(" ");for(c in a)this.column(c)?b[this.column(c).index]=a[c]:alert("'data.addRow' column '"+c+"' not found!");this.records.push(b);this.table.records++;return this},filter:function(a){this.selection=new f.Table;for(var b in this.records)a&&a(this.records[b])&&(this.selection.records.push(this.records[b]),this.selection.table.records++);this.selection.fields=this.fields.slice();this.selection.table.fields=
this.table.fields;return this.selection},select:function(a){if(a.match(/WHERE/)){for(var b=a.split("WHERE")[1].trim().split(" "),c=0;c<b.length;c++)if(b[c].length){if('"'==b[c][0]&&'"'!=b[c][b[c].length-1]){do b[c]=b[c]+" "+b[c+1],b.splice(c+1,1);while('"'!=b[c][b[c].length-1])}if("("==b[c][0]&&")"!=b[c][b[c].length-1]){do b[c]=b[c]+" "+b[c+1],b.splice(c+1,1);while(")"!=b[c][b[c].length-1])}}else b.splice(c,1),c--;this.filterQueryA=[];var d={},g="";do{var e=0;3<=b.length&&(d={},d.szSelectionField=
b[0].replace(/("|)/g,""),d.szSelectionOp=b[1],d.szSelectionValue=b[2].replace(/("|)/g,""),e=3);"BETWEEN"==d.szSelectionOp&&5<=b.length&&"AND"==b[3]&&(d.szSelectionValue2=b[4],e=5);if(e){for(c=0;c<this.fields.length;c++)this.fields[c].id==d.szSelectionField&&(d.nFilterFieldIndex=c),"$"+this.fields[c].id+"$"==d.szSelectionValue&&(d.nFilterValueIndex=c);d.szCombineOp=g;this.filterQueryA.push(d);b.splice(0,e)}else{q("data.js - selection error - incomplete query!\nquery: "+a);break}if(b.length&&"AND"==
b[0])g="AND",b.splice(0,1);else if(b.length&&"OR"==b[0])g="OR",b.splice(0,1);else break}while(b.length);this.selection=new f.Table;for(var l in this.filterQueryA)if("undefined"===typeof this.filterQueryA[l].nFilterFieldIndex)return this.selection.fields=this.fields.slice(),this.selection.table.fields=this.table.fields,_LOG("Selection: invalid query: "+a),this.selection;for(var h in this.records){a=null;for(l in this.filterQueryA)this.__szValue=String(this.records[h][this.filterQueryA[l].nFilterFieldIndex]),
this.__szSelectionOp=this.filterQueryA[l].szSelectionOp.toUpperCase(),this.__szSelectionValue=this.filterQueryA[l].szSelectionValue,this.__szSelectionValue2=this.filterQueryA[l].szSelectionValue2,this.__szCombineOp=this.filterQueryA[l].szCombineOp,null!=this.filterQueryA[l].nFilterValueIndex&&(this.__szSelectionValue=String(this.records[h][this.filterQueryA[l].nFilterValueIndex])),b=__scanValue(this.__szValue),b="="==this.__szSelectionOp?"*"==this.__szSelectionValue?""!=this.__szValue.replace(/ /g,
""):this.__szValue==this.__szSelectionValue||b==Number(this.__szSelectionValue):"<>"==this.__szSelectionOp?!(this.__szValue==this.__szSelectionValue||b==Number(this.__szSelectionValue)):">"==this.__szSelectionOp?b>Number(this.__szSelectionValue):"<"==this.__szSelectionOp?b<Number(this.__szSelectionValue):">="==this.__szSelectionOp?b>=Number(this.__szSelectionValue):"<="==this.__szSelectionOp?b<=Number(this.__szSelectionValue):"LIKE"==this.__szSelectionOp?"*"==this.__szSelectionValue?this.__szValue.length:
eval("this.__szValue.match(/"+this.__szSelectionValue.replace(/\//gi,"\\/")+"/i)"):"NOT"==this.__szSelectionOp?!eval("this.__szValue.match(/"+this.__szSelectionValue.replace(/\//gi,"\\/")+"/i)"):"IN"==this.__szSelectionOp?eval("this.__szSelectionValue.match(/\\("+this.__szValue+"\\,/)")||eval("this.__szSelectionValue.match(/\\,"+this.__szValue+"\\,/)")||eval("this.__szSelectionValue.match(/\\,"+this.__szValue+"\\)/)"):"BETWEEN"==this.__szSelectionOp?b>=Number(this.__szSelectionValue)&&b<=Number(this.__szSelectionValue2):
eval("this.__szValue.match(/"+this.__szSelectionValue.replace(/\//gi,"\\/")+"/i)"),a="AND"==this.__szCombineOp?a&&b:a||b;a&&(this.selection.records.push(this.records[h].slice()),this.selection.table.records++)}}this.selection.fields=this.fields.slice();this.selection.table.fields=this.table.fields;return this.selection},aggregate:function(a,b){var c=!1;a.lead&&(c=a.calc&&"mean"==a.calc,b=a.lead,a=a.column||a.value);b=b.split("|");for(var d=[],g=null,e=0;e<b.length;e++)for(var l=0;l<this.fields.length;l++)this.fields[l].id==
b[e]&&(d[e]=l),this.fields[l].id==a&&(g=l);this.aggregation=new f.Table;xRecords=[];xCount=[];for(var h in this.records){xField="";for(e=0;e<d.length;e++)xField+=this.records[h][d[e]];if(xRecords[xField])xRecords[xField][d.length]+=__scanValue(this.records[h][g]),xCount[xField][d.length]++;else{xRecords[xField]=[];xRecords[xField][d.length]=__scanValue(this.records[h][g]);for(e=0;e<d.length;e++)xRecords[xField][e]=this.records[h][d[e]];xCount[xField]=[];xCount[xField][d.length]=1}}for(h in xRecords)c&&
(xRecords[h][d.length]/=xCount[h][d.length]),this.aggregation.records.push(xRecords[h]),this.aggregation.table.records++;c=[];for(e=0;e<b.length;e++)c[e]={id:b[e]};c[b.length]={id:a};this.aggregation.fields=c;this.aggregation.table.fields=c;return this.aggregation},condense:function(a,b){var c={},d=[];a&&a.lead&&(b=a,a=b.lead);a=this.columnIndex(a);if(b&&b.keep)if("string"==typeof b.keep)d[this.columnIndex(b.keep)]=!0;else for(i=0;i<b.keep.length;i++)d[this.columnIndex(b.keep[i])]=!0;for(var g=[],
e=0;e<this.records.length;e++){var l=String(this.records[e][a]);if(null!=c[l]){l=c[l];for(var h in this.records[e])if(!d[h])if(!isNaN(this.records[e][h]))g[l][h]=b&&"max"==b.calc?Math.max(Number(g[l][h]),Number(this.records[e][h])):Number(g[l][h])+Number(this.records[e][h]);else if(isNaN(this.records[e][h])&&g[l][h]!=this.records[e][h]){var k=parseFloat(String(g[l][h]).split(" (+")[1])||0;g[l][h]=String(g[l][h]).split(" (+")[0]+" (+"+ ++k+") "}}else g.push(this.records[e].slice()),c[l]=g.length-1}this.__condense=
new f.Table;this.__condense.fields=this.fields;this.__condense.table.fields=this.fields;this.__condense.records=g.slice();this.__condense.table.records=this.__condense.records.length;return this.__condense},groupColumns:function(a){var b=a.source,c=[],d;for(d in b)c[d]=this.column(b[d]).index;this.addColumn({destination:a.destination},function(a){var b=0,d;for(d in c)b+=Number(a[c[d]]);return b});return this},pivot:function(a){a.lead=a.lead||a.rows;a.cols=a.cols||a.columns;a.keep=a.keep||[];a.sum=
a.sum||[];a.lead=__toArray(a.lead);a.cols=__toArray(a.cols);a.keep=__toArray(a.keep);a.sum=__toArray(a.sum);a.value=__toArray(a.value);a.forced=__toArray(a.forced);for(var b=[],c=0;c<this.fields.length;c++)b[String(this.fields[c].id)]=c;for(c in a.lead)"undefined"==typeof b[a.lead[c]]&&q("data.pivot - pivot keep column '"+a.lead[c]+"' not found");for(c in a.cols)a.cols&&"undefined"==typeof b[a.cols[c]]&&q("data.pivot - pivot columns source column '"+a.cols[c]+"' not found");for(c in a.keep)"undefined"==
typeof b[a.keep[c]]&&q("data.pivot - pivot keep column '"+a.keep[c]+"' not found");for(c in a.sum)"undefined"==typeof b[a.sum[c]]&&q("data.pivot - pivot sum column '"+a.sum[c]+"' not found");for(c in a.value)"undefined"==typeof b[a.value[c]]&&q("data.pivot - pivot value column '"+a.value[c]+"' not found");var d=[],g=[],e=this.records;if(a.forced)for(c in a.forced)console.log(a.forced[c]),g[String(a.forced[c])]=0;for(var l=0;l<e.length;l++){var h=String(e[l][b[a.lead[0]]]);for(c=1;c<a.lead.length;c++)h+=
"|"+e[l][b[a.lead[c]]];var k=String(e[l][b[a.cols[0]]]);if("string"==a.calc)var n=e[l][b[a.value[0]]];else if(n=1,a.value&&a.value.length)for(c=n=0;c<a.value.length;c++)n+=a.value[c]?__scanValue(e[l][b[a.value[c]]]):1;if(!k||1>k.length)k="undefined";"undefined"==typeof g[k]&&(g[k]=0);if(d[h]){for(c=0;c<a.keep.length;c++)e[l][b[a.keep[c]]]&&e[l][b[a.keep[c]]].length&&d[h][a.keep[c]]!=e[l][b[a.keep[c]]]&&(d[h][a.keep[c]]=e[l][b[a.keep[c]]]);for(c=0;c<a.sum.length;c++)d[h][a.sum[c]]+=Number(e[l][b[a.sum[c]]])}else{d[h]=
{Total:0};for(c=0;c<a.keep.length;c++)d[h][a.keep[c]]=e[l][b[a.keep[c]]];for(c=0;c<a.sum.length;c++)d[h][a.sum[c]]=Number(e[l][b[a.sum[c]]])}d[h].Total+=n;d[h][k]?"max"==a.calc?d[h][k]=Math.max(n,d[h][k]):(d[h][k]+=n,d[h][k+"count"]++):(d[h][k]=n,d[h][k+"count"]=1)}this.__pivot=new f.Table;for(c=0;c<a.lead.length;c++)this.__pivot.fields.push({id:a.lead[c]});for(c=0;c<a.keep.length;c++)this.__pivot.fields.push({id:a.keep[c]});for(c=0;c<a.sum.length;c++)this.__pivot.fields.push({id:a.sum[c]});for(var m in g)this.__pivot.fields.push({id:m});
this.__pivot.fields.push({id:"Total"});for(m in d){b=[];e=m.split("|");for(c=0;c<e.length;c++)b.push(e[c]);for(c=0;c<a.keep.length;c++)b.push(d[m][a.keep[c]]);for(c=0;c<a.sum.length;c++)b.push(d[m][a.sum[c]]);for(var p in g)"mean"==a.calc?b.push((d[m][p]||0)/(d[m][p+"count"]||1)):b.push(d[m][p]||0);b.push(d[m].Total);this.__pivot.records.push(b);this.__pivot.table.records++}return this.__pivot},subtable:function(a){this.__subt=new f.Table;if(a.fields){a.columns=[];for(var b=0;b<a.fields.length;b++)for(var c=
0;c<this.fields.length;c++)this.fields[c].id==a.fields[b]&&a.columns.push(c)}for(b=0;b<a.columns.length;b++)this.__subt.fields.push({id:String(this.fields[a.columns[b]].id)}),this.__subt.table.fields++;for(var d in this.records){c=[];for(b=0;b<a.columns.length;b++)c.push(this.records[d][a.columns[b]]);this.__subt.records.push(c);this.__subt.table.records++}return this.__subt},sort:function(a,b){var c=this.column(a).values(),d=0;for(a=0;a<Math.min(c.length,10);a++)isNaN(parseFloat(String(c[a]).replace(",",
".")))||d++;var g=[];if(d)for(a=0;a<c.length;a++)g.push({index:a,value:Number(String(c[a]).replace(",","."))});else for(a=0;a<c.length;a++)g.push({index:a,value:c[a]});b&&"DOWN"==b?g.sort(function(a,b){return a.value>b.value?-1:1}):g.sort(function(a,b){return a.value<b.value?-1:1});b=[];for(a=0;a<g.length;a++)b.push(this.records[g[a].index]);this.records=b;return this},append:function(a){if(this.table.fields.length!=a.table.fields.length)return null;for(var b=0;b<this.table.fields.length;b++)if(this.table.fields[b].id!=
a.table.fields[b].id)return null;a=a.records;for(b=0;b<a.length;b++)this.records.push(a[b]);this.table.records=this.records.length;return this},json:function(){this.__json=[];for(var a in this.records){var b={},c;for(c in this.fields)b[String(this.fields[c].id)]=this.records[a][c];this.__json.push(b)}return this.__json}};__myNumber=function(a){a=parseFloat(a.replace(/\./g,"").replace(/\,/g,"."));return isNaN(a)?0:a};__scanValue=function(a){a=String(a).match(/,/)?parseFloat(String(a).replace(/\./gi,
"").replace(/,/gi,".")):parseFloat(String(a).replace(/ /gi,""));return isNaN(a)?0:a};f.Table.prototype.addTimeColumns=function(a){if(!a.source)return null;for(var b in this.fields)if(this.fields[b].id==a.source){for(var c=a.create||["date","year","month","day","hour"],d=0;d<c.length;d++)this.fields.push({id:String(c[d])}),this.table.fields++;var g=this.records.length,e;for(e=0;e<g;e++){var f=new Date(this.records[e][b]);for(d=0;d<c.length;d++)switch(c[d]){case "date":var h=String(f.getDate())+"."+
String(f.getMonth()+1)+"."+String(f.getFullYear());this.records[e].push(h);break;case "year":this.records[e].push(f.getFullYear());break;case "month":this.records[e].push(f.getMonth()+1);break;case "day":this.records[e].push(f.getDay());break;case "hour":this.records[e].push(f.getHours())}}}return this};f.Column=function(){this.valueA=this.index=this.table=null};f.Column.prototype={values:function(){this.valueA=[];for(var a in this.table.records)this.valueA.push(this.table.records[a][this.index]);
return this.valueA},uniqueValues:function(){this.valueA=[];for(var a in this.table.records)this.valueA.push(this.table.records[a][this.index]);return this.valueA.filter(__onlyUnique)},map:function(a){for(var b in this.table.records)this.table.records[b][this.index]=a(this.table.records[b][this.index],this.table.records[b],this.index);return this},rename:function(a){this.table.fields[this.index].id=a;return this},remove:function(){this.table.fields.splice(this.index,1);for(var a in this.table.records)this.table.records[a].splice(this.index,
1);this.table.table.fields--;return this}};f.Feed.prototype.column=function(a){return this.dbtable.column(a)};f.Feed.prototype.select=function(a){return this.dbtable.select(a)};f.Feed.prototype.aggregate=function(a,b){return this.dbtable.aggregate(a,b)};f.Feed.prototype.revert=function(){return this.dbtable.revert()};f.Feed.prototype.reverse=function(){return this.dbtable.reverse()};f.Feed.prototype.pivot=function(a){return this.dbtable.pivot(a)};f.Feed.prototype.subtable=function(a){return this.dbtable.subtable(a)};
f.Feed.prototype.addTimeColumns=function(a){return this.dbtable.addTimeColumns(a)};f.Broker=function(a){this.souceQueryA=[];this.options=a||{};a&&this.parseDefinition(a);this.onNotify=function(){};this.onError=function(){}};f.Broker.prototype=new f.Feed;f.Broker.prototype={addSource:function(a,b){_LOG("Data.Broker.addSource: "+a);this.souceQueryA.push({url:a,type:b,data:null,result:null,next:this});return this},setCallback:function(a){this.callback=a;return this},realize:function(a){this.callback=
a||this.callback;for(var b in this.souceQueryA)if(this.souceQueryA[b].url&&!this.souceQueryA[b].result)return this.getData(this.souceQueryA[b]),this;this.data=[];for(b in this.souceQueryA)this.data.push(this.souceQueryA[b].data);this.callback(this.data);return this},error:function(a){this.onError=a||this.onError;return this},notify:function(a){this.onNotify=a||this.onNotify;return this}};f.Broker.prototype.parseDefinition=function(a){this.callback=a.callback||null};f.Broker.prototype.getData=function(a){this.onNotify(a);
a.feed=f.feed({source:a.url,type:a.type,options:a.next.options,parent:this}).load(function(b){a.data=b;a.data.raw=a.feed.data;this.parent.onNotify(a);a.result="success";a.next.realize()}).error(function(b){a.data=null;a.result="error";a.next.realize()})};f.Broker.prototype.setData=function(a){this.parent.__doCreateTableDataObject(a,null,this.parent.options)};f.Feed.prototype.broker=function(a){a=new f.Broker(a);a.parent=this;return a};f.broker=function(){return new f.Broker};f.Merger=function(a){this.sourceA=
[];this.options=a||{};a&&this.parseDefinition(a)};f.Merger.prototype={addSource:function(a,b){this.sourceA.push({data:a,opt:b});return this},setOutputColumns:function(a){this.outColumnsA=a;return this},realize:function(a){this.callback=a||this.callback;_LOG("DataMerger: >>>");a=[];for(var b in this.sourceA){var c=this.sourceA[b];c.opt.columns=c.opt.columns||c.data.columnNames();c.opt.label=c.opt.label||[];c.opt.columns=__toArray(c.opt.columns);c.opt.label=__toArray(c.opt.label);this.sourceA[b].data||
q("DataMerger: source '"+b+"' not found");this.sourceA[b].data[0]||(this.sourceA[b].data=this.sourceA[b].data.getArray());this.sourceA[b].data[0]||q("DataMerger: source '"+b+"' not found or not of type Array");c=[];for(var d in this.sourceA[b].data[0]){this.sourceA[b].data[0][d]==this.sourceA[b].opt.lookup&&(c[this.sourceA[b].opt.lookup]=d);for(var g in this.sourceA[b].opt.columns)this.sourceA[b].opt.label[g]||(this.sourceA[b].opt.label[g]=this.sourceA[b].opt.columns[g]+"."+(Number(b)+1)+""),this.sourceA[b].data[0][d]==
this.sourceA[b].opt.columns[g]&&(c[this.sourceA[b].opt.label[g]]=d)}for(g in this.sourceA[b].opt.columns)c[this.sourceA[b].opt.label[g]]||_LOG("DataMerger: '"+this.sourceA[b].opt.label[g]+"' not found");a.push(c)}c=[];for(b in this.sourceA)for(d in this.sourceA[b].opt.label)c.push(this.sourceA[b].opt.label[d]);if(!this.outColumnsA)for(b in this.outColumnsA=[],c)this.outColumnsA.push(c[b]);c=[];for(b in this.outColumnsA)for(d in a)for(g in a[d])g==this.outColumnsA[b]&&(c[g]={input:d,index:a[d][g]});
for(b in this.outColumnsA)if(!c[this.outColumnsA[b]])for(d in this.sourceA[0].data[0])this.sourceA[0].data[0][d]==this.outColumnsA[b]&&(c[this.outColumnsA[b]]={input:0,index:d});this.namedSourceA=[];for(b=1;b<this.sourceA.length;b++)for(this.namedSourceA[b]=[],d=1;d<this.sourceA[b].data.length;d++)this.namedSourceA[b][String(this.sourceA[b].data[d][a[b][this.sourceA[b].opt.lookup]])]=this.sourceA[b].data[d];g=[];g.push(this.outColumnsA);for(b=1;b<this.sourceA[0].data.length;b++){var e=String(this.sourceA[0].data[b][[a[0][this.sourceA[0].opt.lookup]]]),
k=[];for(d in this.outColumnsA){var h=c[this.outColumnsA[d]];if(h)0==h.input?k.push(this.sourceA[0].data[b][h.index]):this.namedSourceA[h.input][e]?k.push(this.namedSourceA[h.input][e][h.index]):k.push(" ");else return q('DataMerger - missing "'+this.outColumnsA[d]+'" in label:[...]'),null}g.push(k)}_LOG("DataMerger: done");b=new f.Table;b.setArray(g);this.callback&&this.callback(b);return b},error:function(a){this.onError=a||this.onError;return this}};f.merger=function(){return new f.Merger};console.log("*** data.js "+
f.version+" ***");var q=function(a){console.log("data.js v"+f.version+": "+a)}})(window,document);
