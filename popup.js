document.addEventListener('DOMContentLoaded', function() {
    const $ = name => document.querySelector(name);
    const input = $('#input');
    const ton = new TonWeb();

    const showAddress = (value, fromPublicKey) => {
        try {
            const address = new TonWeb.utils.Address(value);
            $('#result').innerHTML = (fromPublicKey ?
                '<div class="title">This public key gives v3R1 wallet with an address that can be represented in the following forms:</div>' :
                '<div class="title">This TON address can be represented in the following forms:</div>') +
                '<div><div class="title">HEX:</div><div class="addr">' + address.toString(false) + '</div></div>' +
                '<div class="title bold">Mainnet:</div>' +
                '<div><div class="title">Bounceable:</div><div class="addr">' + address.toString(true, true, true, false) + '</div></div>' +
                '<div><div class="title">Non-bounceable:</div><div class="addr">' + address.toString(true, true, false, false) + '</div></div>' +
                '<div class="title bold">Testnet:</div>' +
                '<div><div class="title">Bounceable:</div><div class="addr">' + address.toString(true, true, true, true) + '</div></div>' +
                '<div><div class="title">Non-bounceable:</div><div class="addr">' + address.toString(true, true, false, true) + '</div></div>';
        } catch (error) {
            $('#result').innerHTML = '<div class="title">Error: ' + error.message + '</div>';
        }
    };

    const onChange = async e => {
        const value = input.value.trim();
        if (!value.length) {
            $('#result').innerHTML = '';
        } else if (!TonWeb.utils.Address.isValid(value)) {
            try {
                if (value.length === 64) {
                    const publicKeyArr = TonWeb.utils.hexToBytes(value);
                    const wallet = new ton.wallet.all['v3R1'](ton.provider, {
                        publicKey: publicKeyArr,
                        wc: 0
                    });
                    const walletAddress = (await wallet.getAddress()).toString(true, true, true);
                    showAddress(walletAddress, true);
                } else {
                    $('#result').innerHTML = '<div class="title">Not valid TON address</div>';
                }
            } catch (error) {
                $('#result').innerHTML = '<div class="title">Error: ' + error.message + '</div>';
            }
        } else {
            showAddress(value);
        }
    };

    input.addEventListener('input', onChange);
    input.addEventListener('change', onChange);
    input.addEventListener('cut', onChange);
    input.addEventListener('paste', onChange);
}); 