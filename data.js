!function(window,document,undefined){function expose(){var t=window.Data;Data.noConflict=function(){return window.Data=t,this},window.Data=Data}var _log_start_time=new Date;_LOG=function(t){new Date;var e=(new Date-_log_start_time)/1e3;console.log("_LOG: time[sec.ms] "+e+" "+t)};var Data={version:"1.38",errors:[]};"object"==typeof module&&"object"==typeof module.exports?module.exports=Data:"function"==typeof define&&define.amd&&define(Data),void 0!==window&&expose(),Data.Object=function(t){this.options=t,this.debug=!1},Data.Object.prototype={import:function(t){this.options.success=t;var e=Data.feed({});return e.options=this.options,e.__processJsonData(this.options.source,this.options),this},error:function(t){return this.options.error=t,this}},Data.Feed=function(t){this.options=t||{},this.debug=!1,this.options.error=function(t){Data.errors.push(t)}},Data.Feed.prototype={load:function(t){this.options.success=t;var e=this.options,i=e.source||e.src||e.url||e.ext,s=this;return i||_alert("Data.feed(...).load(): no source defined !",2e3),"csv"==e.type||"CSV"==e.type?this.__doCSVImport(i,e):"rss"==e.type||"RSS"==e.type?this.__doRSSImport(i,e):"kml"==e.type||"KML"==e.type?this.__doKMLImport(i,e):"json"==e.type||"JSON"==e.type||"Json"==e.type?this.__doJSONImport(i,e):"geojson"==e.type||"GEOJSON"==e.type||"GeoJson"==e.type?this.__doGeoJSONImport(i,e):"jsonDB"==e.type||"JSONDB"==e.type||"JsonDB"==e.type||"jsondb"==e.type?this.__doJsonDBImport(i,e):"jsonstat"==e.type||"jsonStat"==e.type||"JSONSTAT"==e.type?$.getScript("http://json-stat.org/lib/json-stat.js").done(function(t,r){s.__doLoadJSONstat(i,e)}).fail(function(t,i,s){_alert("'"+e.type+"' unknown format !")}):_alert("'"+e.type+"' unknown format !"),this},error:function(t){return this.options.error=t,this}},Data.feed=function(t,e){return new Data.Feed(t,e)},Data.object=function(t,e){return new Data.Object(t,e)};var ixmaps=ixmaps||{};Data.Feed.prototype.__doLoadJSONstat=function(t,e){var i=this;JSONstat(t,function(){var t=new Array,s=[this.Dataset(0).Dimension(0).label],r=this.Dataset(0).Dimension(1).id;for(o=0;o<r.length;o++)s.push(this.Dataset(0).Dimension(1).Category(r[o]).label);t.push(s);for(var o=0;o<this.Dataset(0).Dimension(0).length;o++){(s=new Array).push(this.Dataset(0).Dimension(0).Category(this.Dataset(0).Dimension(0).id[o]).label);for(var a=0;a<this.Dataset(0).Dimension(1).length;a++)s.push(this.Dataset(0).Data([o,a]).value);t.push(s)}e.callback?e.callback(t,e):i.__createDataTableObject(t,e.type,e)})},Data.Feed.prototype.__doJsonDBImport=function(t,e){_LOG("__doJsonDBImport: "+t);var i=this;e.url=t,$.getScript(t+".gz").done(function(t,s){i.__processJsonDBData(t,e)}).fail(function(s,r,o){$.getScript(t).done(function(t,s){i.__processJsonDBData(t,e)}).fail(function(e,s,r){i.options.error&&i.options.error('"'+t+'" '+r)})})},Data.Feed.prototype.__processJsonDBData=function(script,opt){_LOG("__processJsonDBData:"),this.dbtable=new Data.Table;var name=opt.source.split(/\//).pop();name=name.split(/\./)[0];var loadedTable=eval(name);this.dbtable.table=loadedTable.table,this.dbtable.fields=loadedTable.fields,this.dbtable.records=loadedTable.records,opt.callback?opt.callback(newData,opt):void 0!==opt&&opt.success&&opt.success(this.dbtable)},Data.Feed.prototype.__doCSVImport=function(t,e){_LOG("__doCSVImport: "+t);var i=this;$.ajax({type:"GET",url:t,dataType:"text",success:function(t){i.__processCSVData(t,e)},error:function(i,s,r){void 0!==e&&e.error&&e.error('"'+t+'" '+r)}})},Data.Feed.prototype.__processCSVData=function(t,e){_LOG("__processCSVData:");new Array(0),new Array(0);if("undefined"==typeof Papa)return __this=this,void $.getScript("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.2/papaparse.min.js").done(function(i,s){__this.__processCSVData(t,e)}).fail(function(t,i,s){_alert("'"+e.type+"' parser not loaded !")});var i=Papa.parse(t,e.parser).data;return void 0===i[0]||void 0===i[1]?(_alert(i),e.error&&e.error(i),delete t,delete i,!1):(e.parser&&e.parser.delimiter||i[0].length!=i[1].length&&(_LOG("csv parser: autodetect failed"),_LOG("csv parser: delimiter = ;"),(i=Papa.parse(t,{delimiter:";"}).data)[0].length!=i[1].length&&(_LOG("csv parser: delimiter = ; failed"),_LOG("csv parser: delimiter = ,"),(i=Papa.parse(t,{delimiter:","}).data)[0].length!=i[1].length&&(_LOG("csv parser: delimiter = , failed"),_alert("csv parsing error")))),i[i.length-1].length!=i[0].length&&i.pop(),i[0].length-i[1].length==1&&" "==i[0][i[0].length-1]&&i[0].pop(),e.callback?void e.callback(i,e):(_LOG("__createDataTableObject:"),this.__createDataTableObject(i,e.type,e),t=null,i=null,!1))},Data.Feed.prototype.__doRSSImport=function(t,e){_LOG("__doRSSImport: "+t);var i=this;e.format="xml",$.ajax({type:"GET",url:t,dataType:"xml",success:function(t){i.__processRSSData(t,e)},error:function(t,i,s){void 0!==e&&e.error&&e.error(t,i,s)}})},Data.Feed.prototype.__processRSSData=function(t,e){if("xml"==e.format){$(t).find("rss").length?this.__parseRSSData(t,e):$(t).find("feed").length?_alert("feed not yet supported"):$(t).find("atom").length&&_alert("atom not yet supported")}},Data.Feed.prototype.__parseRSSData=function(t,e){var i=this;if("xml"==e.format){$(t).find("rss").attr("version");$(t).find("channel").each(function(){var s=[],r=null;$(t).find("item").each(function(){if(!r){var t=[];r=[];for(var e=$(this).children(),i=0;i<e.length;i++){for(var o=$(this).children()[i].nodeName;t[o];)o+="*";t[o]=o,r[i]=o}s.push(r)}var a=[];for(i=0;i<r.length;i++)"enclosure"==r[i]?a.push($(this).find(r[i]+":first").attr("url")||""):a.push($(this).find(r[i]+":first").text()||"");s.push(a)}),i.__createDataTableObject(s,"rss",e)})}},Data.Feed.prototype.__doKMLImport=function(t,e){_LOG("__doKMLImport: "+t);var i=this;e.format="xml",$.ajax({type:"GET",url:t,dataType:"xml",success:function(t){i.__processKMLData(t,e)},error:function(t,i,s){void 0!==e&&e.error&&e.error(t,i,s)}})},Data.Feed.prototype.__processKMLData=function(t,e){if("xml"==e.format){$(t).find("kml").length?this.__parseKMLData(t,e):_alert("feed not kml")}},Data.Feed.prototype.__parseKMLData=function(t,e){if("xml"==e.format){$(t).find("kml").attr("xmlns");var i=[],s=null;$(t).find("Document").find("Placemark").each(function(){var t=$(this).find("ExtendedData")||$(this);s||(s=[],t.find("Data").each(function(){s.push($(this).attr("name"))}),$(this).find("Point").find("coordinates")&&s.push("KML.Point"),i.push(s));var e=[];t.find("Data").each(function(){e.push($(this).find("value").text())}),$(this).find("Point").find("coordinates")&&e.push($(this).find("Point").find("coordinates").text()),i.push(e)}),console.log(i),this.__createDataTableObject(i,"kml",e)}},Data.Feed.prototype.__doJSONImport=function(t,e){var i=this;$.get(t,function(t){i.__processJsonData(t,e)}).fail(function(t){void 0!==e&&e.error&&e.error(t)})},Data.Feed.prototype.__processJsonData=function(t,e){if("string"==typeof t)try{var i=JSON.parse(t)}catch(t){this.__createDataTableObject([],"json",e)}else i=t;this.data=i;var s=[],r=[];if(i&&i.data&&i.data.columns&&i.data.rows){var o=i.data.columns,a=i.data.rows;for(var n in o)r.push(o[n]);s.push(r);for(n=0;n<a.length;n++){r=[];for(var l in a[0])r.push(a[n][l]);s.push(r)}}else{i&&i.data&&(i=i.data);for(var u in i[0])r.push(u);s.push(r);for(n=0;n<i.length;n++){r=[];for(var u in i[0])r.push(i[n][u]);s.push(r)}}this.__createDataTableObject(s,"json",e)},Data.Feed.prototype.__doGeoJSONImport=function(t,e){var i=this;$.get(t,function(t){i.__processGeoJsonData(t,e)}).fail(function(t){void 0!==e&&e.error&&e.error(t)})},Data.Feed.prototype.__processGeoJsonData=function(t,e){if("string"==typeof t)try{var i=JSON.parse(t)}catch(t){this.__createDataTableObject([],"json",e)}else i=t;this.data=i;var s=[],r=[];for(p in i.features[0].properties)r.push(p);r.push("geometry"),s.push(r);for(var o=0;o<i.features.length;o++){r=[];for(p in i.features[o].properties)r.push(i.features[o].properties[p]);r.push(JSON.stringify(i.features[o].geometry)),s.push(r)}this.__createDataTableObject(s,"json",e)},Data.Feed.prototype.__createDataTableObject=function(t,e,i){if(t)return this.dbtable=(new Data.Table).setArray(t),t=null,void(void 0!==i&&i.success&&i.success(this.dbtable))},Data.Table=function(t){t?(this.table=t.table,this.fields=t.fields,this.records=t.records):(this.table={records:0,fields:0},this.fields=[],this.records=[])},Data.Table.prototype={getArray:function(){var t=[[]];for(var e in this.fields)t[0].push(this.fields[e].id);for(e=0;e<this.records.length;e++)t.push(this.records[e]);return t},setArray:function(t){this.fields=[];for(var e in t[0])this.fields.push({id:(t[0][e]||" ").trim(),typ:0,width:60,decimals:0});t.shift(),this.records=[];for(var i in t)t[i].length==this.fields.length&&this.records.push(t[i]);return this.table={records:this.records.length,fields:this.fields.length},this},revert:function(){for(var t=[],e=this.records.length-1;e>=0;e--)t.push(this.records[e]);return this.records=t,this},reverse:function(){for(var t=[],e=this.records.length-1;e>=0;e--)t.push(this.records[e]);return this.records=t,this},columnNames:function(){var t=[];for(var e in this.fields)t.push(this.fields[e].id);return t},columnIndex:function(t){for(var e in this.fields)if(this.fields[e].id==t)return e;return null},column:function(t){for(var e in this.fields)if(this.fields[e].id==t){var i=new Data.Column;return i.index=e,i.table=this,i}return null},lookupArray:function(t,e){var s=[];this.column(e)||alert("'"+e+"' column not found!"),this.column(t)||alert("'"+t+"' column not found!");var r=this.column(e).values(),o=this.column(t).values();for(i in r)s[String(r[i])]=o[i]||"-";return s},lookup:function(t,e){var i=e.value,s=e.lookup,r=i+"_"+s;return this.lookupsA&&this.lookupsA[r]||(this.lookupsA=this.lookupsA||[],this.lookupsA[r]=this.lookupArray(i,s)),this.lookupsA[r][t]||"-"},addColumn:function(t,e){if(!t.destination)return alert("'data.addColumn' no destination defined!"),null;var i=null;if(t.source){for(var s in this.fields)this.fields[s].id==t.source&&(i=s);if(null==i)return alert("'data.addColumn' source column '"+t.source+"' not found!"),null}this.fields.push({id:String(t.destination),created:!0}),this.table.fields++;for(var r in this.records)this.records[r].push(e(null!=i?this.records[r][i]:this.records[r]));return this},select:function(szSelection){if(szSelection.match(/WHERE/)){for(var szTokenA=szSelection.split("WHERE ")[1].split(" "),ii=0;ii<szTokenA.length;ii++)if('"'==szTokenA[ii][0]&&'"'!=szTokenA[ii][szTokenA[ii].length-1])do{szTokenA[ii]=szTokenA[ii]+" "+szTokenA[ii+1],szTokenA.splice(ii+1,1)}while('"'!=szTokenA[ii][szTokenA[ii].length-1]);this.filterQueryA=[];var filterObj={},szCombineOp="";do{var nToken=0;if(szTokenA.length>=3&&(filterObj={},filterObj.szSelectionField=szTokenA[0].replace(/("|)/g,""),filterObj.szSelectionOp=szTokenA[1],filterObj.szSelectionValue=szTokenA[2].replace(/("|)/g,""),nToken=3),"BETWEEN"==filterObj.szSelectionOp&&szTokenA.length>=5&&"AND"==szTokenA[3]&&(filterObj.szSelectionValue2=szTokenA[4],nToken=5),!nToken){_alert("data.js - selection error - incomplete query!\nquery: "+szSelection);break}for(var ii=0;ii<this.fields.length;ii++)this.fields[ii].id==filterObj.szSelectionField&&(filterObj.nFilterFieldIndex=ii),this.fields[ii].id==filterObj.szSelectionValue&&(filterObj.nFilterValueIndex=ii);if(filterObj.szCombineOp=szCombineOp,this.filterQueryA.push(filterObj),szTokenA.splice(0,nToken),szTokenA.length&&"AND"==szTokenA[0])szCombineOp="AND",szTokenA.splice(0,1);else{if(!szTokenA.length||"OR"!=szTokenA[0])break;szCombineOp="OR",szTokenA.splice(0,1)}}while(szTokenA.length);this.selection=new Data.Table;for(var i in this.filterQueryA)if(void 0===this.filterQueryA[i].nFilterFieldIndex)return this.selection.fields=this.fields.slice(),this.selection.table.fields=this.table.fields,_LOG("Selection: invalid query: "+szSelection),this.selection;for(var j in this.records){var allResult=null;for(var i in this.filterQueryA){var result=!0;this.__szValue=String(this.records[j][this.filterQueryA[i].nFilterFieldIndex]),this.__szSelectionOp=this.filterQueryA[i].szSelectionOp,this.__szSelectionValue=this.filterQueryA[i].szSelectionValue,this.__szSelectionValue2=this.filterQueryA[i].szSelectionValue2,this.__szCombineOp=this.filterQueryA[i].szCombineOp,null!=this.filterQueryA[i].nFilterValueIndex&&(this.__szSelectionValue=String(this.records[j][this.filterQueryA[i].nFilterValueIndex]));var nValue=__scanValue(this.__szValue);result="="==this.__szSelectionOp?"*"==this.__szSelectionValue?""!=this.__szValue.replace(/ /g,""):this.__szValue==this.__szSelectionValue||nValue==Number(this.__szSelectionValue):"<>"==this.__szSelectionOp?!(this.__szValue==this.__szSelectionValue||nValue==Number(this.__szSelectionValue)):">"==this.__szSelectionOp?nValue>Number(this.__szSelectionValue):"<"==this.__szSelectionOp?nValue<Number(this.__szSelectionValue):">="==this.__szSelectionOp?nValue>=Number(this.__szSelectionValue):"<="==this.__szSelectionOp?nValue<=Number(this.__szSelectionValue):"LIKE"==this.__szSelectionOp?eval("this.__szValue.match(/"+this.__szSelectionValue.replace(/\//gi,"\\/")+"/i)"):"NOT"==this.__szSelectionOp?!eval("this.__szValue.match(/"+this.__szSelectionValue.replace(/\//gi,"\\/")+"/i)"):"IN"==this.__szSelectionOp?eval("this.__szSelectionValue.match(/\\("+this.__szValue+"\\,/)")||eval("this.__szSelectionValue.match(/\\,"+this.__szValue+"\\,/)")||eval("this.__szSelectionValue.match(/\\,"+this.__szValue+"\\)/)"):"BETWEEN"==this.__szSelectionOp?nValue>=Number(this.__szSelectionValue)&&nValue<=Number(this.__szSelectionValue2):eval("this.__szValue.match(/"+this.__szSelectionValue.replace(/\//gi,"\\/")+"/i)"),allResult="AND"==this.__szCombineOp?allResult&&result:allResult||result}allResult&&(this.selection.records.push(this.records[j]),this.selection.table.records++)}}return this.selection.fields=this.fields.slice(),this.selection.table.fields=this.table.fields,this.selection},aggregate:function(t,e){for(var i=e.split("|"),s=[],r=null,o=0;o<i.length;o++)for(var a=0;a<this.fields.length;a++)this.fields[a].id==i[o]&&(s[o]=a),this.fields[a].id==t&&(r=a);this.aggregation=new Data.Table,xRecords=[];for(var n in this.records){xField="";for(o=0;o<s.length;o++)xField+=this.records[n][s[o]];if(xRecords[xField])xRecords[xField][s.length]+=__scanValue(this.records[n][r]);else{xRecords[xField]=[],xRecords[xField][s.length]=__scanValue(this.records[n][r]);for(o=0;o<s.length;o++)xRecords[xField][o]=this.records[n][s[o]]}}for(var n in xRecords)this.aggregation.records.push(xRecords[n]),this.aggregation.table.records++;var l=[];for(o=0;o<i.length;o++)l[o]={id:i[o]};return l[i.length]={id:t},this.aggregation.fields=l,this.aggregation.table.fields=l,this.aggregation},condense:function(t,e){var s={},r=this.columnIndex(t),o=[];if(e&&e.keep)if("string"==typeof e.keep)o[this.columnIndex(e.keep)]=!0;else for(i=0;i<e.keep.length;i++)o[this.columnIndex(e.keep[i])]=!0;for(var a=0;a<this.records.length;a++){var n=String(this.records[a][r]);if(null!=s[n]){var l=s[n];for(v in this.records[a])if(!o[v])if(isNaN(this.records[a][v])||this.records[l][v]==this.records[a][v]){if(isNaN(this.records[a][v])&&this.records[l][v]!=this.records[a][v]){var u=parseFloat(String(this.records[l][v]).split(" (+")[1])||0;this.records[l][v]=String(this.records[l][v]).split(" (+")[0]+" (+"+ ++u+") "}}else this.records[l][v]=Number(this.records[l][v])+Number(this.records[a][v]);this.records.splice(a,1),a--}else s[n]=a}return this},pivot:function(t){t.lead=t.lead||t.rows,t.cols=t.cols||t.columns,t.keep=t.keep||[],t.sum=t.sum||[],__isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},__toArray=function(t){return t&&void 0!==t?__isArray(t)?t:String(t).match(/\|/)?String(t).split("|"):String(t).split(","):[]},t.lead=__toArray(t.lead),t.cols=__toArray(t.cols),t.keep=__toArray(t.keep),t.sum=__toArray(t.sum),t.value=__toArray(t.value);for(var e=[],i=0;i<this.fields.length;i++)e[String(this.fields[i].id)]=i;for(i in t.lead)void 0===e[t.lead[i]]&&_alert("data.pivot - pivot keep column '"+t.lead[i]+"' not found");for(i in t.cols)t.cols&&void 0===e[t.cols[i]]&&_alert("data.pivot - pivot columns source column '"+t.cols[i]+"' not found");for(i in t.keep)void 0===e[t.keep[i]]&&_alert("data.pivot - pivot keep column '"+t.keep[i]+"' not found");for(i in t.sum)void 0===e[t.sum[i]]&&_alert("data.pivot - pivot sum column '"+t.sum[i]+"' not found");for(i in t.value)void 0===e[t.value[i]]&&_alert("data.pivot - pivot value column '"+t.value[i]+"' not found");for(var s=[],r=[],o=this.records,a=0;a<o.length;a++){for(var n=String(o[a][e[t.lead[0]]]),l=1;l<t.lead.length;l++)n+="|"+o[a][e[t.lead[l]]];var u=String(o[a][e[t.cols[0]]]),h=1;if(t.value&&t.value.length){h=0;for(l=0;l<t.value.length;l++)h+=t.value[l]?__scanValue(o[a][e[t.value[l]]]):1}if((!u||u.length<1)&&(u="undefined"),r[u]||(r[u]=0),s[n]){for(l=0;l<t.keep.length;l++)o[a][e[t.keep[l]]].length&&s[n][t.keep[l]]!=o[a][e[t.keep[l]]]&&(s[n][t.keep[l]]=o[a][e[t.keep[l]]]);for(l=0;l<t.sum.length;l++)s[n][t.sum[l]]+=Number(o[a][e[t.sum[l]]])}else{s[n]={Total:0};for(var l=0;l<t.keep.length;l++)s[n][t.keep[l]]=o[a][e[t.keep[l]]];for(var l=0;l<t.sum.length;l++)s[n][t.sum[l]]=Number(o[a][e[t.sum[l]]])}s[n].Total+=h,s[n][u]?"max"==t.calc?s[n][u]=Math.max(h,s[n][u]):(s[n][u]+=h,s[n][u+"count"]++):(s[n][u]=h,s[n][u+"count"]=1)}this.__pivot=new Data.Table;for(this.__pivot.records,l=0;l<t.lead.length;l++)this.__pivot.fields.push({id:t.lead[l]});for(l=0;l<t.keep.length;l++)this.__pivot.fields.push({id:t.keep[l]});for(l=0;l<t.sum.length;l++)this.__pivot.fields.push({id:t.sum[l]});for(var c in r)this.__pivot.fields.push({id:c});this.__pivot.fields.push({id:"Total"});for(var c in s){var d=new Array,p=c.split("|");for(l=0;l<p.length;l++)d.push(p[l]);for(l=0;l<t.keep.length;l++)d.push(s[c][t.keep[l]]);for(l=0;l<t.sum.length;l++)d.push(s[c][t.sum[l]]);for(var f in r)"mean"==t.calc?d.push((s[c][f]||0)/(s[c][f+"count"]||1)):d.push(s[c][f]||0);d.push(s[c].Total),this.__pivot.records.push(d),this.__pivot.table.records++}return this.__pivot},subtable:function(t){if(this.__subt=new Data.Table,t.fields){t.columns=[];for(var e=0;e<t.fields.length;e++)for(var i=0;i<this.fields.length;i++)this.fields[i].id==t.fields[e]&&t.columns.push(i)}for(e=0;e<t.columns.length;e++)this.__subt.fields.push({id:String(this.fields[t.columns[e]].id)}),this.__subt.table.fields++;for(var s in this.records){var r=[];for(e=0;e<t.columns.length;e++)r.push(this.records[s][t.columns[e]]);this.__subt.records.push(r),this.__subt.table.records++}return this.__subt},sort:function(t){for(var e=this.column(t).values(),i=[],s=0;s<e.length;s++)i.push({index:s,value:e[s]});i.sort(function(t,e){return t.value<e.value?-1:1});var r=[];for(s=0;s<i.length;s++)r.push(this.records[i[s].index]);return this.records=r,this},append:function(t){if(console.log("test"),this.table.fields.length!=t.table.fields.length)return null;for(var e=0;e<this.table.fields.length;e++)if(this.table.fields[e].id!=t.table.fields[e].id)return null;var i=t.records;for(e=0;e<i.length;e++)this.records.push(i[e]);return this.table.records=this.records.length,this}},__myNumber=function(t){var e=parseFloat(t.replace(/\./g,"").replace(/\,/g,"."));return isNaN(e)?0:e},__scanValue=function(t){if(String(t).match(/,/)){var e=parseFloat(String(t).replace(/\./gi,"").replace(/,/gi,"."));return isNaN(e)?0:e}e=parseFloat(String(t).replace(/ /gi,""));return isNaN(e)?0:e},Data.Table.prototype.addTimeColumns=function(t){if(!t.source)return null;for(var e in this.fields)if(this.fields[e].id==t.source){for(var i=t.create||["date","year","month","day","hour"],s=0;s<i.length;s++)this.fields.push({id:String(i[s])}),this.table.fields++;var r=this.records.length,o=0;for(o=0;o<r;o++){var a=new Date(this.records[o][e]);if(a)for(s=0;s<i.length;s++)switch(i[s]){case"date":var n=String(a.getDate())+"."+String(a.getMonth()+1)+"."+String(a.getFullYear());this.records[o].push(n);break;case"year":this.records[o].push(a.getFullYear());break;case"month":this.records[o].push(a.getMonth()+1);break;case"day":this.records[o].push(a.getDay());break;case"hour":this.records[o].push(a.getHours())}}}return this},Data.Column=function(){this.table=null,this.index=null,this.valueA=null},Data.Column.prototype={values:function(){this.valueA=[];for(var t in this.table.records)this.valueA.push(this.table.records[t][this.index]);return this.valueA},map:function(t){for(var e in this.table.records)this.table.records[e][this.index]=t(this.table.records[e][this.index],this.table.records[e],this.index);return this},rename:function(t){return this.table.fields[this.index].id=t,this},remove:function(){this.table.fields.splice(this.index,1);for(var t in this.table.records)this.table.records[t].splice(this.index,1);return this.table.table.fields--,this}},Data.Feed.prototype.column=function(t){return this.dbtable.column(t)},Data.Feed.prototype.select=function(t){return this.dbtable.select(t)},Data.Feed.prototype.aggregate=function(t,e){return this.dbtable.aggregate(t,e)},Data.Feed.prototype.revert=function(){return this.dbtable.revert()},Data.Feed.prototype.reverse=function(){return this.dbtable.reverse()},Data.Feed.prototype.pivot=function(t){return this.dbtable.pivot(t)},Data.Feed.prototype.subtable=function(t){return this.dbtable.subtable(t)},Data.Feed.prototype.addTimeColumns=function(t){return this.dbtable.addTimeColumns(t)},Data.Broker=function(t){this.souceQueryA=[],this.options=t,t&&this.parseDefinition(t),this.onNotify=function(){},this.onError=function(){}},Data.Broker.prototype=new Data.Feed,Data.Broker.prototype={addSource:function(t,e){return _LOG("Data.Broker.addSource: "+t),this.souceQueryA.push({url:t,type:e,data:null,result:null,next:this}),this},setCallback:function(t){return this.callback=t,this},realize:function(t){this.callback=t||this.callback;for(var e in this.souceQueryA)if(this.souceQueryA[e].url&&!this.souceQueryA[e].result)return this.getData(this.souceQueryA[e]),this.onNotify(e),this;this.data=[];for(var e in this.souceQueryA)this.data.push(this.souceQueryA[e].data);return this.callback(this.data),this},error:function(t){return this.onError=t||this.onError,this},notify:function(t){return this.onNotify=t||this.onNotify,this}},Data.Broker.prototype.parseDefinition=function(t){this.callback=t.callback||null},Data.Broker.prototype.getData=function(t){Data.feed({source:t.url,type:t.type}).load(function(e){t.data=e,t.result="success",t.next.realize()}).error(function(e){t.data=null,t.result="error",t.next.realize()})},Data.Broker.prototype.setData=function(t){this.parent.__doCreateTableDataObject(t,null,this.parent.options)},Data.Feed.prototype.broker=function(t){var e=new Data.Broker(t);return e.parent=this,e},Data.broker=function(){return new Data.Broker},Data.Merger=function(t){this.sourceA=[],this.options=t,t&&this.parseDefinition(t)},Data.Merger.prototype={addSource:function(t,e){return this.sourceA.push({data:t,opt:e}),this},setOutputColumns:function(t){return this.outColumnsA=t,this},realize:function(t){this.callback=t||this.callback,_LOG("DataMerger: >>>");var e=[];for(i in this.sourceA){this.sourceA[i].data[0]||(this.sourceA[i].data=this.sourceA[i].data.getArray()),this.sourceA[i].data[0]||_alert("DataMerger: source '"+i+"' not found or not of type Array"),this.sourceA[i].opt.label||(this.sourceA[i].opt.label=[]);var s=[];for(ii in this.sourceA[i].data[0]){this.sourceA[i].data[0][ii]==this.sourceA[i].opt.lookup&&(s[this.sourceA[i].opt.lookup]=ii);for(iii in this.sourceA[i].opt.columns)this.sourceA[i].opt.label[iii]||(this.sourceA[i].opt.label[iii]=this.sourceA[i].opt.columns[iii]+"."+(Number(i)+1)),this.sourceA[i].data[0][ii]==this.sourceA[i].opt.columns[iii]&&(s[this.sourceA[i].opt.label[iii]]=ii)}for(iii in this.sourceA[i].opt.columns)s[this.sourceA[i].opt.label[iii]]||_LOG("DataMerger: '"+this.sourceA[i].opt.label[iii]+"' not found");e.push(s)}var r=[];for(i in this.sourceA)for(ii in this.sourceA[i].opt.label)r.push(this.sourceA[i].opt.label[ii]);if(!this.outColumnsA){this.outColumnsA=[];for(i in r)this.outColumnsA.push(r[i])}var o=[];for(i in this.outColumnsA)for(ii in e)for(iii in e[ii])iii==this.outColumnsA[i]&&(o[iii]={input:ii,index:e[ii][iii]});for(i in this.outColumnsA)if(!o[this.outColumnsA[i]])for(ii in this.sourceA[0].data[0])this.sourceA[0].data[0][ii]==this.outColumnsA[i]&&(o[this.outColumnsA[i]]={input:0,index:ii});for(this.namedSourceA=[],i=1;i<this.sourceA.length;i++)for(this.namedSourceA[i]=[],ii=1;ii<this.sourceA[i].data.length;ii++)this.namedSourceA[i][String(this.sourceA[i].data[ii][e[i][this.sourceA[i].opt.lookup]])]=this.sourceA[i].data[ii];var a=[];for(a.push(this.outColumnsA),i=1;i<this.sourceA[0].data.length;i++){var n=String(this.sourceA[0].data[i][[e[0][this.sourceA[0].opt.lookup]]]),l=[];for(ii in this.outColumnsA){var u=o[this.outColumnsA[ii]];if(!u)return _alert('DataMerger - missing "'+this.outColumnsA[ii]+'" in label:[...]'),null;0==u.input?l.push(this.sourceA[0].data[i][u.index]):this.namedSourceA[u.input][n]?l.push(this.namedSourceA[u.input][n][u.index]):l.push(" ")}a.push(l)}_LOG("DataMerger: done");var h=new Data.Table;return h.setArray(a),this.callback&&this.callback(h),h},error:function(t){return this.onError=t||this.onError,this}},Data.merger=function(){return new Data.Merger},console.log("*** data.js "+Data.version+" ***");var _alert=function(t){alert("data.js v"+Data.version+": "+t)}}(window,document);