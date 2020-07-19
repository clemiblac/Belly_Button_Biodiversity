

function buildPlot(){
    d3.json("./samples.json").then((data) => {
        console.log(data)
        
        //3 main parts of samples.json -- names, metadata,samples
        ///////////  BUILDING DROP DOWN MENU FOR EACH TEST SUBJECT /////////////////////
        //saving "names" Array in samples.json to a variable
        var select_id=data.names;
        //Select drowdown 
        var dropdownMenu = d3.select("#selDataset");
        //Append "option" for each test subject ID in HTML
        select_id.forEach((person) => {
            var row=dropdownMenu.append("option");
            //ADD Test subject IDs to dropdown menu
            row.text(person);
            row.property("value",person)
        });
       
        /////Demographic Info
        d3.select("select").on("change",function(d){
            var selected = d3.select("#selDataset").node().value;
            console.log(selected);

            ///metadata
            d3.select("#sample-metadata").text(selected);
            var metadata_values=data.metadata;
            var demographic_info=metadata_values.filter(s=>s.id==selected)
            console.log(demographic_info)
            d3.select("#sample-metadata").append("p").text(`ID: ${demographic_info[0].id}`)
            d3.select("#sample-metadata").append("p").text(`ETHNICITY:: ${demographic_info[0].ethnicity}`)
            d3.select("#sample-metadata").append("p").text(`GENDER: ${demographic_info[0].gender}`)
            d3.select("#sample-metadata").append("p").text(`AGE: ${demographic_info[0].age}`)
            d3.select("#sample-metadata").append("p").text(`LOCATION: ${demographic_info[0].location}`)
            d3.select("#sample-metadata").append("p").text(`BBTYPE: ${demographic_info[0].bbtype}`)
            d3.select("#sample-metadata").append("p").text(`WFREQ: ${demographic_info[0].wfreq}`)


            //// Exploring data for plots ///////////////////
            console.log("samples subsection of samples.json");
            var sample_d=data.samples;
            //console.log(sample_d);
            var sample_record=sample_d.filter(s=>s.id==selected)
            sample_record=sample_record[0]
            console.log("sample of choice")
            console.log(sample_record)

            //Use `sample_values` as the values for the bar chart.
            var values=sample_record.sample_values
            console.log("samples_values/values");
            console.log(values);

            //Use `otu_ids` as the labels for the bar chart.
            var labels = sample_record.otu_ids;
            var labels2 = sample_record.otu_ids;
            console.log("otu_ids/labels");
            console.log(labels);
            //Use `otu_labels` as the hovertext for the chart.
            var hovertext = sample_record.otu_labels;
            console.log("otu_labels/hovertext");
            console.log(hovertext);
            //hbar variables
            var bar_values = values;
            var bar_labels= labels2;
            var bar_hover = hovertext;
            
            console.log("choice sample values");
            console.log(bar_values);
            console.log("choice OTU IDs");
            console.log(bar_labels);
            
            //Plot Code
            /*for(var i=0;i<labels2.length;i++){
                labels2[i]="#"+labels2[i];
            }*/
            // Display the default plot
            //  Create  trace.
            var hbar_data = [{
                text:bar_hover,
                type: 'bar',
                x: bar_values.slice(0,11),
                transforms: [{
                    type: 'sort',
                    target: 'x',
                    order: 'ascending'
                },{
                    type: 'filter',
                    target: 'x',
                    operation: '>',
                    value: 1
                }], 
            }];
            // 7. Define our plot layout
            var layout = {
                title: `Top 10 OTUs found in test subject`,
                xaxis: { title:"sample values"},
                yaxis: {title:"otu ids"}
            };
            // 8. Plot the chart to a div tag with id "bar-plot"
            Plotly.newPlot('bar', hbar_data, layout);

            //bubble variables
            var bubble_values = values;
            var bubble_labels = labels;
            var bubble_hover = hovertext;

            //Bubble graph
            var Bubble_d = {
                x:bubble_labels,
                y:bubble_values,
                text:bubble_hover,
                mode:'markers',
                marker:{
                    color:bubble_labels,
                    size:bubble_values
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
                
        })
    
    });

    
}


buildPlot();
    
        



