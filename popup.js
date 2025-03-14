document.addEventListener('DOMContentLoaded', function() {
    const $ = name => document.querySelector(name);
    const $$ = name => document.querySelectorAll(name);
    const input = $('#input');
    const pasteButton = $('#paste-button');
    const ton = new TonWeb();

    // Auto-focus the input field when the popup opens
    input.focus();

    // Handle paste button click - do nothing as requested
    function handlePasteButtonClick(e) {
        // Prevent default button behavior
        e.preventDefault();
        // Do nothing else
    }

    // Add click event listener to the paste button
    pasteButton.addEventListener('click', handlePasteButtonClick);

    // Function to copy text to clipboard and show notification
    function copyToClipboard(text, container) {
        navigator.clipboard.writeText(text)
            .then(() => {
                // Check if notification already exists
                let notification = container.querySelector('.copy-notification');
                
                // If notification doesn't exist, create it
                if (!notification) {
                    notification = document.createElement('div');
                    notification.className = 'copy-notification';
                    container.appendChild(notification);
                }
                
                // Show the notification
                notification.textContent = 'Copied to clipboard!';
                notification.style.display = 'block';
                
                // Hide the notification after 1.5 seconds
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 1500);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }

    // Function to add click-to-copy functionality to all .addr elements
    function setupCopyToClipboard() {
        // Use event delegation for dynamically added .addr elements
        document.addEventListener('click', function(e) {
            // Handle clicks on address elements
            if (e.target.classList.contains('addr')) {
                const text = e.target.textContent;
                const addrContainer = e.target.closest('.addr-container');
                copyToClipboard(text, addrContainer);
            }
            
            // Handle clicks on copy buttons
            if (e.target.classList.contains('copy-button')) {
                const addrContainer = e.target.closest('.addr-container');
                const addrElement = addrContainer.querySelector('.addr');
                const text = addrElement.textContent;
                copyToClipboard(text, addrContainer);
            }
        });
    }

    // Set up the copy-to-clipboard functionality
    setupCopyToClipboard();

    const showAddress = (value, fromPublicKey) => {
        try {
            const address = new TonWeb.utils.Address(value);
            $('#result').innerHTML = (fromPublicKey ?
                '<div class="title">This public key gives v3R1 wallet with an address that can be represented in the following forms:</div>' :
                '<div class="title">This TON address can be represented in the following forms:</div>') +
                '<div><div class="title">HEX:</div><div class="addr-container"><div class="addr-row"><div class="addr">' + address.toString(false) + '</div><button class="copy-button" title="Copy to clipboard">📋</button></div></div></div>' +
                '<div class="title bold">Mainnet:</div>' +
                '<div><div class="title">Bounceable:</div><div class="addr-container"><div class="addr-row"><div class="addr">' + address.toString(true, true, true, false) + '</div><button class="copy-button" title="Copy to clipboard">📋</button></div></div></div>' +
                '<div><div class="title">Non-bounceable:</div><div class="addr-container"><div class="addr-row"><div class="addr">' + address.toString(true, true, false, false) + '</div><button class="copy-button" title="Copy to clipboard">📋</button></div></div></div>' +
                '<div class="title bold">Testnet:</div>' +
                '<div><div class="title">Bounceable:</div><div class="addr-container"><div class="addr-row"><div class="addr">' + address.toString(true, true, true, true) + '</div><button class="copy-button" title="Copy to clipboard">📋</button></div></div></div>' +
                '<div><div class="title">Non-bounceable:</div><div class="addr-container"><div class="addr-row"><div class="addr">' + address.toString(true, true, false, true) + '</div><button class="copy-button" title="Copy to clipboard">📋</button></div></div></div>';
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