importScripts("/socket.io/socket.io.js"),self.onmessage=function(e){var t=e.data,n=io.connect(t);n.on("done",function(){self.postMessage("done!")}),n.on("connect_failed",function(){self.postMessage("connect failed")}),n.on("error",function(){self.postMessage("error")}),n.send("woot")};