// Store a reference to the downloadPdf function
let downloadPdfFunction = null;

function handleExplore(event) {
    event.preventDefault();
    const inputDestination = document.getElementById("exploreInputDestination").value;
    const choices = document.getElementsByName("exploreRadio");
    const selectedChoice = Array.from(choices).find(
        (choices) => choices.checked
    )?.value;
    const resultDiv = document.getElementById("exploreOutputDiv");

    // Clear the input field
    document.getElementById("exploreInputDestination").value = "";
    document.querySelector("#exploreOutputDiv").style.display = "none";

    // Loading Screen
    document.getElementById("loading-screen").style.display = "block";


    const exploreCloseButton = document.querySelector(".home-button11");
    const exploreDiv = document.querySelector("#exploreOutputDiv");

    exploreCloseButton.addEventListener("click", () => {
        exploreDiv.style.display = "none";
    });

    try {
        fetch("/explore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputDestination, selectedChoice }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Display the prediction
            if (!data.error) {
                document.getElementById("loading-screen").style.display = "none";
                resultDiv.style.display = "flex"; // Show the resultDiv
                const downloadButton = document.getElementById("exploreDownload");

                // Remove previous event listener if it exists
                if (downloadPdfFunction) {
                    downloadButton.removeEventListener("click", downloadPdfFunction);
                }

                // Create a new instance of the downloadPdf function
                downloadPdfFunction = async () => {
                    try {
                        if (data.rows[0].cuisine) {
                            const pdfBytes = await generatePdf(data.rows[0].cuisine);
                            download(pdfBytes, "MravelCuisines.pdf", "application/pdf");
                        } else {
                            const pdfBytes = await generatePdf(data.rows[0].spot);
                            download(pdfBytes, "MravelAttractions.pdf", "application/pdf");
                        }
                    } catch (error) { 
                        alert("An error occurred while generating the PDF:", error)
                        console.error("An error occurred while generating the PDF:", error);
                    }
                };

                // Attach the new event listener
                downloadButton.addEventListener("click", downloadPdfFunction);
            } else {
                document.getElementById("loading-screen").style.display = "none";
                alert("We are caught in the middle of an error. Please try Again!");
            }
        });
    } catch (error) {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while exploring the options.");
    }
}
