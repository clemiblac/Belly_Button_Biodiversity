

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
            //hbar variables
            var bar_values_940 = s_940.map(s =>  s.sample_values.slice(0,11));
            var bar_labels_940 = s_940.map(s =>  s.otu_ids.slice(0,11));
            var bar_hover_940 = s_940.map(s =>  s.otu_labels.slice(0,11));

            console.log("940 Sample values");
            console.log(bar_values_940);
            console.log("940 OTU ID");
            console.log(bar_labels_940);

            //bubble variables
            var bubble_values_940 = s_940.map(s =>  s.sample_values);
            var bubble_labels_940 = s_940.map(s =>  s.otu_ids);
            var bubble_hover_940 = s_940.map(s =>  s.otu_labels);


            //Plot Code
            //subject_940

            // Display the default plot
            
            //  Create  trace.
            var hbar_data = [{
                type: 'bar',
                x: bar_values_940[0],
                y: bar_labels_940[0],
                orientation:'h'
            }];
                
            // 7. Define our plot layout
            var layout = {
                title: "Top 10 OTUs found in test subject",
                xaxis: { title:"sample_values"  },
                yaxis: { title: "otu ids"}
            };
                
            // 8. Plot the chart to a div tag with id "bar-plot"
            Plotly.newPlot('bar', hbar_data, layout);


            //Bubble graph
           
            
            var Bubble_d = {
                x:bubble_labels_940[0],
                y:bubble_values_940[0],
                mode:'markers',
                marker:{
                    color:bubble_labels_940[0],
                    size:bubble_values_940[0]
                }
            };
            var Bubble=[Bubble_d];

            var layout = {
            title: 'Bubble Chart of each Sample',
            showlegend: false,
            height: 600,
            width: 1000
            };

            Plotly.newPlot("bubble", Bubble,layout);


            //Demographic info
            console.log("Demographic info")
          
            var demographic_info = data.metadata[0];
            console.log(demographic_info);


            //Adding all the drop down options
            select_id=data.names;
            console.log(select_id);
            //Select drowdown 
            var drpdwnoption = d3.select("#selDataset");
            //Append "option"
            select_id.forEach((id) => {
                var row=drpdwnoption.append("option");
                for (var i=0; i < select_id.length; i++){
                    console.log(select_id[i])
                    //row.text(i)
                }
                
            });
            




           /* function getData() {
                var dropdownMenu = d3.select("#selData").node();

                // Assign the value of the dropdown menu option to a variable
                var dataset = dropdownMenu.value;
                // Initialize an empty array for the country's data
                var data = [];
                var labels = [];
              
                if (dataset == 'us') {
                    data = us;
                    labels = us_labels;
                    Plotly.restyle("pie", "values", [data]);
                    Plotly.restyle("pie", "label", [labels]);
                }
                else if (dataset == 'uk') {
                    data = uk;
                    labels = uk_labels;
                    Plotly.restyle("pie", "values", [data]);
                    Plotly.restyle("pie", "label", [labels]);
                }
                else if (dataset == 'canada') {
                    data = canada;
                    labels = ca_labels;
                    Plotly.restyle("pie", "values", [data]);
                    Plotly.restyle("pie", "label", [labels]);
                }
                
            }
        */
        });


}


buildPlot()