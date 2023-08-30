// Store a reference to the downloadPdf function for accommodation
let downloadPdfFunctionAccommodation = null;

function handleAccomodation(event) {
    event.preventDefault();
    const inputDestination = document.getElementById("accomodationInputDestination").value;
    const inputType = document.getElementById("accomodationInputType").value;
    const resultDiv = document.getElementById("accomodationOutputDiv");
    
    // Clear the input field
    document.getElementById("accomodationInputDestination").value = "";
    document.querySelector("#accomodationOutputDiv").style.display = "none";

    // Show Loading Screen
    document.getElementById("loading-screen").style.display = "block";
  
    const accomodationCloseButton = document.querySelector(".home-button08");
    const accomodationDiv = document.querySelector("#accomodationOutputDiv");
  
    accomodationCloseButton.addEventListener("click", () => {
        accomodationDiv.style.display = "none";
    });
  
    try {
        fetch("/accomodation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputDestination, inputType }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Display the prediction
            if (!data.error) {
                document.getElementById("loading-screen").style.display = "none";
                resultDiv.style.display = "flex"; // Show the resultDiv
                const downloadButton = document.getElementById("accomodationDownload");

                // Remove previous event listener if it exists
                if (downloadPdfFunctionAccommodation) {
                    downloadButton.removeEventListener("click", downloadPdfFunctionAccommodation);
                }

                // Create a new instance of the downloadPdf function for accommodation
                downloadPdfFunctionAccommodation = async () => {
                    try {
                        const pdfBytes = await generatePdf(data.rows[0].hotel);
                        download(pdfBytes, "MravelAccomodation.pdf", "application/pdf");
                    } catch (error) {
                        alert("An error occurred while generating the PDF:", error)
                        console.error("An error occurred while generating the PDF:", error);
                    }
                };

                // Attach the new event listener for accommodation
                downloadButton.addEventListener("click", downloadPdfFunctionAccommodation);
            } else {
                document.getElementById("loading-screen").style.display = "none";
                alert("We are caught in the middle of an error. Please try Again!");
                resultDiv.style.display = "flex"; // Show the resultDiv
            }
        });
    } catch (error) {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding the best accommodations.");
    }
}
