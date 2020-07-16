/*d3.json("./samples.json", function(data) {
    console.log(data);
});*/

function buildPlot(){
    fetch("./samples.json")
        .then(function(resp){
            return resp.json();
        })
        .then(function(data){
            console.log(data)
            //3 main parts of samples.json -- names, metadata,samples
            console.log("samples subsection of samples.json");
            console.log(data.samples);
            ////////////////////////////////////////////////////////////////////////
            //Use `sample_values` as the values for the bar chart.
            var values = data.samples.map(s =>  s.sample_values.slice(0,11));
            console.log("samples_values/values");
            console.log(values);
    
            //Use `otu_ids` as the labels for the bar chart.
            var labels = data.samples.map(s =>  s.otu_ids.slice(0,11));
            console.log("otu_ids/labels");
            console.log(labels);

            //Use `otu_labels` as the hovertext for the chart.
            var hovertext = data.samples.map(s =>  s.otu_labels.slice(0,11));
            console.log("otu_labels/hovertext");
            console.log(hovertext);

            //test subject id
            var s_940=data.samples.slice(0,1);
            var values_940 = s_940.map(s =>  s.sample_values.slice(0,11));
            var labels_940 = s_940.map(s =>  s.otu_ids.slice(0,11));
            var hover_940 = s_940.map(s =>  s.otu_labels.slice(0,11));
            console.log("940 data");
            console.log(values_940);
            console.log(labels_940);


            //Plot Code
            //subject_940

            // Display the default plot
            
            //  Create  trace.
            var hbar_data = [{
                type: "bar",
                x: values_940,
                y: labels_940,
                orientation:"h"
            }];
                
            // 7. Define our plot layout
            var layout = {
                title: "Top 10 OTUs found in test subject",
                xaxis: { title:"sample_values"  },
                yaxis: { title: "otu ids"}
            };
                
            // 8. Plot the chart to a div tag with id "bar-plot"
            Plotly.newPlot("bar", hbar_data, layout);
        
        });
}
buildPlot()