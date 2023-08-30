// Store a reference to the downloadPdf function for itinerary
let downloadPdfFunctionItinerary = null;

function handleItinerary(event) {
    event.preventDefault();
    const inputDestination = document.getElementById("itineraryDestInput").value;
    const inputDuration = document.getElementById("itineraryDurationInput").value;
    const resultDiv = document.getElementById("itineraryOutputDiv");
    
    // Clear the input field
    document.getElementById("itineraryDestInput").value = "";
    document.querySelector("#itineraryOutputDiv").style.display = "none";

    // Show Loading Screen
    document.getElementById("loading-screen").style.display = "block";
  
    const itineraryCloseButton = document.querySelector(".home-button05");
    const itineraryDiv = document.querySelector("#itineraryOutputDiv");
  
    itineraryCloseButton.addEventListener("click", () => {
        itineraryDiv.style.display = "none";
    });
  
    try {
        fetch("/itinerary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputDestination, inputDuration }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Display the prediction
            if (!data.error) {
                document.getElementById("loading-screen").style.display = "none";
                resultDiv.style.display = "flex"; // Show the resultDiv
                const downloadButton = document.getElementById("itineraryDownload");

                // Remove previous event listener if it exists
                if (downloadPdfFunctionItinerary) {
                    downloadButton.removeEventListener("click", downloadPdfFunctionItinerary);
                }

                // Create a new instance of the downloadPdf function for itinerary
                downloadPdfFunctionItinerary = async () => {
                    try {
                        const pdfBytes = await generatePdf(data.rows[0].itinerary);
                        download(pdfBytes, "MravelItinerary.pdf", "application/pdf");
                    } catch (error) {
                        alert("An error occurred while generating the PDF:", error)
                        console.error("An error occurred while generating the PDF:", error);
                    }
                };

                // Attach the new event listener for itinerary
                downloadButton.addEventListener("click", downloadPdfFunctionItinerary);
            } else {
                document.getElementById("loading-screen").style.display = "none";
                alert("We are caught in the middle of an error. Please try Again!");
                resultDiv.style.display = "flex"; // Show the resultDiv
            }
        });
    } catch (error) {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while generating the itinerary.");
    }
}
