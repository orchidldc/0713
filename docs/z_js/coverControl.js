window.$docsify = window.$docsify || {};
$docsify.plugins = [].concat(function(hook, vm) {
    hook.ready(function() {
        function setupToggle() {
            const toggleButton = document.getElementById('toggleMode');
            const videoCover = document.querySelector('.video-cover');
            const markdownCover = document.querySelector('.markdown-cover');

            if (toggleButton && videoCover && markdownCover) {
                toggleButton.addEventListener('click', function () {
                    if (videoCover.style.display === 'none') {
                        videoCover.style.display = 'block';
                        markdownCover.style.display = 'none';
                        toggleButton.textContent = 'Static';
                    } else {
                        videoCover.style.display = 'none';
                        markdownCover.style.display = 'block';
                        toggleButton.textContent = 'Dynamic'; 
                    }
                });
            } else {
                setTimeout(setupToggle, 100);
            }
        }

        setupToggle();
    });
}, $docsify.plugins);