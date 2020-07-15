/*d3.json("./samples.json", function(data) {
    console.log(data);
});*/

fetch("./samples.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data)
        //3 main parts of samples.json -- names, metadata,samples
        console.log("samples subsection of samples.json");
        console.log(data.samples);

        //Use `sample_values` as the values for the bar chart.
        var values = data.samples.map(s =>  s.sample_values);
        console.log("samples_values/values");
        console.log(values);
   
        //Use `otu_ids` as the labels for the bar chart.
        var labels = data.samples.map(s =>  s.otu_ids);
        console.log("otu_ids/labels");
        console.log(labels);

        //Use `otu_labels` as the hovertext for the chart.
        var hovertext = data.samples.map(s =>  s.otu_labels);
        console.log("otu_labels/hovertext");
        console.log(hovertext);

        //Sorting data
        var numArray = [3, 2, 100, 4, 52, 41, 95, 1];
        numArray.sort() // descending order
        console.log(numArray)

        // Slice the first 10 values
        //var left = names.slice(0, 2);
        //console.log(labels)

        /*

        //Plot Code

        // 5. Create your trace.
        var trace = {
            x: labels,
            y: values,
            type: "bar"
        };
        
        // 6. Create the data array for our plot
        var hbar_data = [trace];
        
        // 7. Define our plot layout
        var layout = {
            title: "Top 10 OTUs found in test subject",
            xaxis: { title: "otu ids" },
            yaxis: { title: "sample_values"}
        };
        
        // 8. Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", hbar_data, layout);
        */
    })
