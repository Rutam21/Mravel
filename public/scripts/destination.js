// Store a reference to the downloadPdf function for destinations
let downloadPdfFunctionDest = null;

function handleDestination(event) {
    event.preventDefault();
    const inputCountry = document.getElementById("destCountryInput").value;
    const inputInterest = document.getElementById("destInterestInput").value;
    const inputSeason = document.getElementById("destSeasonInput").value;
    const inputBudget = document.getElementById("destBudgetInput").value;
    const resultDiv = document.getElementById("destOutputDiv");
    
    // Clear the input field
    document.getElementById("destCountryInput").value = "";
    document.querySelector("#destOutputDiv").style.display = "none";

    // Loading Screen
    document.getElementById("loading-screen").style.display = "block";
  
    const destinationCloseButton = document.querySelector(".home-button02");
    const destinationDiv = document.querySelector("#destOutputDiv");
  
    destinationCloseButton.addEventListener("click", () => {
        destinationDiv.style.display = "none";
    });
  
    try {
        fetch("/destinations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputCountry, inputInterest, inputSeason, inputBudget }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Display the prediction
            if (!data.error) {
                document.getElementById("loading-screen").style.display = "none";
                resultDiv.style.display = "flex"; // Show the resultDiv
                const downloadButton = document.getElementById("destDownload");

                // Remove previous event listener if it exists
                if (downloadPdfFunctionDest) {
                    downloadButton.removeEventListener("click", downloadPdfFunctionDest);
                }

                // Create a new instance of the downloadPdf function for destinations
                downloadPdfFunctionDest = async () => {
                    try {
                        const pdfBytes = await generatePdf(data.rows[0].destination);
                        download(pdfBytes, "MravelDestination.pdf", "application/pdf");
                    } catch (error) {
                        alert("An error occurred while generating the PDF:", error)
                        console.error("An error occurred while generating the PDF:", error);
                    }
                };

                // Attach the new event listener for destinations
                downloadButton.addEventListener("click", downloadPdfFunctionDest);
            } else {
                document.getElementById("loading-screen").style.display = "none";
                alert("We are caught in the middle of an error. Please try Again!");
                resultDiv.style.display = "flex"; // Show the resultDiv
            }
        });
    } catch (error) {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while translating the text");
    }
}
