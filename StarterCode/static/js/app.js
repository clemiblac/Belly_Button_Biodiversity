

function buildPlot(){
    d3.json("./samples.json").then((data) => {
    
        console.log(data)
        //3 main parts of samples.json -- names, metadata,samples

        ///////////  BUILDING DROP DOWN MENU FOR EACH TEST SUBJECT /////////////////////
        //saving "names" Array in samples.json to a variable
        var select_id=data.names;
        //console.log("Test subject ID No.")
        //console.log(select_id);

        //Select drowdown 
        var drpdwnoption = d3.select("#selDataset");
        //Append "option" for each test subject ID in HTML
        select_id.forEach((person) => {
            var row=drpdwnoption.append("option");
            //ADD Test subject IDs to dropdown menu
            row.text(person);
            row.property("value",person)

        });

        var choice='940';
        
        
        /////////////   FILLING IN DEMOGRAPHIC INFO  /////////////////
        var metadata_values=data.metadata;
        var demographic_info=metadata_values.filter(s=>s.id==choice)
        var demographic_info=demographic_info[0]
        //console.log("Demographic info")
        //console.log(demographic_info)
        
    
        //Loading data to web page
        var demo=d3.select("#sample-metadata")

        d1=demo.append("p");
        d1.text(`ID: ${demographic_info.id}`)
        d2=demo.append("p");
        d2.text(`ETHNICITY: ${demographic_info.ethnicity}`)
        d3=demo.append("p");
        d3.text(`GENDER: ${demographic_info.gender}`)
        d4=demo.append("p");
        d4.text(`AGE: ${demographic_info.age}`)
        d5=demo.append("p");
        d5.text(`LOCATION: ${demographic_info.location}`)
        d6=demo.append("p");
        d6.text(`BBTYPE: ${demographic_info.bbtype}`)
        d7=demo.append("p");
        d7.text(`WFREQ: ${demographic_info.wfreq}`)
        



        ///// Exploring data for plots ///////////////////
        console.log("samples subsection of samples.json");
        var sample_d=data.samples;
        //console.log("sample data");
        //console.log(sample_d);
        var sample_record=sample_d.filter(s=>s.id==choice)
        sample_record=sample_record[0]
        console.log("sample of choice")
        console.log(sample_record)
        ////////////////////////////////////////////////////////////////////////
        //Use `sample_values` as the values for the bar chart.
        var values=sample_record.sample_values
        console.log("samples_values/values");
        console.log(values);

        //Use `otu_ids` as the labels for the bar chart.
        var labels = sample_record.otu_ids;
        console.log("otu_ids/labels");
        console.log(labels);

        //Use `otu_labels` as the hovertext for the chart.
        var hovertext = sample_record.otu_labels;
        console.log("otu_labels/hovertext");
        console.log(hovertext);


        //hbar variables
        var bar_values = values;
        var bar_labels= labels;
        var bar_hover = hovertext;

        console.log("choice sample values");
        console.log(bar_values);
        console.log("choice OTU IDs");
        console.log(bar_labels);

        //bubble variables
        var bubble_values = values;
        var bubble_labels = labels;
        var bubble_hover = hovertext;


        //Plot Code
        // Display the default plot
        
        //  Create  trace.
        var hbar_data = [{
            type: 'bar',
            x: bar_values,
            //y: bar_labels,

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
            xaxis: { title:"sample_values"},
            yaxis: {title:"otu ids"}
        };
            
        // 8. Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot('bar', hbar_data, layout);


        //Bubble graph
        
        
        var Bubble_d = {
            x:bubble_labels,
            y:bubble_values,
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