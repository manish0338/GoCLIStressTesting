const util = require('util');
var cmd = require('node-cmd');
var cmdGet = util.promisify(cmd.get,{ multiArgs: true, context: cmd });

const cli = '/Users/manish/Desktop/go-sdk/hmy_cli';
let c = 1;
async function startStressTest(command, count){
    try{
        var res = await Promise.all(new Array(count).fill(undefined).map(()=> 
            cmdGet(
                `export GOPATH=/Users/manish/go
                export LD_LIBRARY_PATH=$GOPATH/src/github.com/harmony-one/bls/lib:$GOPATH/src/github.com/harmony-one/mcl/lib:/usr/local/opt/openssl/lib
                export DYLD_FALLBACK_LIBRARY_PATH=$LD_LIBRARY_PATH
                ` + cli + ' ' + command
            )));

        console.log(res);
    }catch(err){console.log("errors" , c++);}
}

async function main(){
    await startStressTest('keys list',10);
    await startStressTest('account one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',10);
    //startStressTest('/Users/manish/Desktop/go-sdk/hmy_cli blockchain protocol-version');
    //startStressTest('/Users/manish/Desktop/go-sdk/hmy_cli transfer --from-address one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7 --from-shard 0 --to-address one129r9pj3sk0re76f7zs3qz92rggmdgjhtwge62k --to-shard 0 --amount 1 --key-store-dir /Users/manish/go/src/github.com/harmony-one/harmony/.hmy/keystore -n http://localhost:9500');
    //startStressTest('/Users/manish/Desktop/go-sdk/hmy_cli blockchain protocol-version');
}
main()