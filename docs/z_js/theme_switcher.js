document.addEventListener('DOMContentLoaded', function() {
    const htmlElement = document.documentElement;

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'style') {
                const colorScheme = htmlElement.style.getPropertyValue('color-scheme');
                updateTdStylesBasedOnTheme(colorScheme);
            }
        });
    });

    observer.observe(htmlElement, { attributes: true, attributeFilter: ['style'] });

    function updateTdStylesBasedOnTheme(colorScheme) {
        const style = colorScheme.includes('light')
            ? {
                backgroundColor: "#f3f3ef", 
                borderColor: "#f3f3ef", 
                borderTop: "1px solid #f3f3ef", 
                borderBottom: "1px solid #f3f3ef", 
                borderLeft: "1px solid #f3f3ef", 
                borderRight: "1px solid #f3f3ef",

                borderTop1: "2px solid #000001",
                borderBottom1: "2px solid #000001",
                borderRight1: "2px solid #000001",
                specialfontcolor: "#0086B5",
            }
            : { 
                backgroundColor: "#6C7B8B",
                borderColor: "#6C7B8B", 
                borderTop: "1px solid #6C7B8B", 
                borderBottom: "1px solid #6C7B8B", 
                borderLeft: "1px solid #6C7B8B", 
                borderRight: "1px solid #6C7B8B",

                borderTop1: "2px solid #000001",
                borderBottom1: "2px solid #000001",
                borderRight1: "2px solid #000001",
                specialfontcolor: "#42b983",
            };
        
        // set all caption
        document.querySelectorAll('caption').forEach(td => {
            td.style.backgroundColor = style.backgroundColor;
            td.style.borderBottom = style.borderBottom;
            td.style.borderLeft = style.borderLeft;
            td.style.borderRight = style.borderRight;
        });
        document.querySelectorAll('.caption1').forEach(td => {
            td.style.backgroundColor = style.backgroundColor;
            td.style.borderLeft = style.borderLeft;
            td.style.borderRight = style.borderRight;
            td.style.borderBottom = "2px solid #000001";
        });

        // document.querySelectorAll('th, td').forEach(td => {
            //     td.style.backgroundColor = style.backgroundColor;
            //     td.style.borderTop = style.borderTop;
            //     td.style.borderBottom = style.borderBottom;
            //     td.style.borderLeft = style.borderLeft;
            //     td.style.borderRight = style.borderRight;
            // });

        // set all th
        document.querySelectorAll('#th1, #th1l, #th1c, #th2c').forEach(td => {
            td.style.backgroundColor = style.backgroundColor;
            td.style.borderLeft = style.borderLeft;
            td.style.borderRight = style.borderRight;
        });

        // set all td
        document.querySelectorAll('#td1, #td1l, #td1c, #td11').forEach(td => {
            td.style.backgroundColor = style.backgroundColor;
            td.style.borderColor = style.borderColor;
        });
        document.querySelectorAll('#td1c_r_solid').forEach(td => {
            td.style.backgroundColor = style.backgroundColor;
            td.style.borderTop = style.borderTop;
            td.style.borderBottom = style.borderBottom;
            td.style.borderLeft = style.borderLeft;
        });
        document.querySelectorAll('#td1_empty').forEach(td => {
            td.style.backgroundColor = style.backgroundColor;
            td.style.borderColor = style.borderColor;
            td.style.color = style.backgroundColor;
        });

        document.querySelectorAll('#td2, #td2l, #td2r').forEach(td => {
            td.style.backgroundColor = style.backgroundColor;
            td.style.borderBottom = style.borderBottom;
            td.style.borderLeft = style.borderLeft;
            td.style.borderRight = style.borderRight;
        });

        document.querySelectorAll('#td3, #td3l, #td3c').forEach(td => {
            td.style.backgroundColor = style.backgroundColor;
            td.style.borderTop = style.borderTop;
            td.style.borderLeft = style.borderLeft;
            td.style.borderRight = style.borderRight;
        });
        document.querySelectorAll('#td3c_r_solid').forEach(td => {
            td.style.backgroundColor = style.backgroundColor;
            td.style.borderTop = style.borderTop;
            td.style.borderLeft = style.borderLeft;
        });


        document.querySelectorAll('.container h3, .container h4').forEach(h => {
            h.style.color = style.specialfontcolor;
        });
        document.querySelectorAll('.container .menu a:nth-child(1)').forEach(a => {
            a.style.backgroundColor = style.backgroundColor;
        });
    }

    const initialColorScheme = htmlElement.style.getPropertyValue('color-scheme');
    updateTdStylesBasedOnTheme(initialColorScheme);
});