

function buildPlot(){
    d3.json("./samples.json").then((data) => {
        console.log(data)
        
        //3 main parts of samples.json -- names, metadata,samples

        /////////         default data ///////////////////////////////////////////
        
        d3.select("#sample-metadata").append("p").text(`ID: ${data.metadata[0].id}`)
        d3.select("#sample-metadata").append("p").text(`ETHNICITY: ${data.metadata[0].ethnicity}`)
        d3.select("#sample-metadata").append("p").text(`GENDER: ${data.metadata[0].gender}`)
        d3.select("#sample-metadata").append("p").text(`AGE: ${data.metadata[0].age}`)
        d3.select("#sample-metadata").append("p").text(`LOCATION: ${data.metadata[0].location}`)
        d3.select("#sample-metadata").append("p").text(`BBTYPE: ${data.metadata[0].bbtype}`)
        d3.select("#sample-metadata").append("p").text(`WFREQ: ${data.metadata[0].wfreq}`)



        //// Exploring data for default plots ///////////////////
        //console.log("samples subsection of samples.json");
        var sample_default=data.samples;
        //console.log(sample_default);
        var sample_record_default=sample_default.filter(s=>s.id=="940")

        // console.log("default choice")
        //console.log(sample_record_default)

        // //Use `sample_values` as the values for the bar chart.
        var default_values=sample_record_default[0].sample_values
        //console.log("samples_values/values");
        //console.log(default_values);

        //Use `otu_ids` as the labels for the bar chart.
        var default_labels = sample_record_default[0].otu_ids;
        var default_labels2 = sample_record_default[0].otu_ids;
        //console.log("otu_ids/labels");
        //console.log(default_labels);
        //Use `otu_labels` as the hovertext for the chart.
        var default_hovertext = sample_record_default[0].otu_labels;
        // console.log("otu_labels/hovertext");
        //console.log(default_hovertext);
        //hbar variables
        var default_bar_values = default_values;
        var default_bar_labels= default_labels2;
        var default_bar_hover = default_hovertext;
        
        // console.log("choice sample values");
        // console.log(bar_values);
        // console.log("choice OTU IDs");
        // console.log(bar_labels);


        // Display the default plot
        //  Create  trace


        var def_yticks = default_labels.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var def_barData = [
          {
            y: def_yticks,
            x: default_bar_values.slice(0, 10).reverse(),
            text: default_bar_values.slice(0, 10).reverse().map(String),
            textposition: 'auto',
            type: "bar",
            orientation: "h",
          }
        ];
    
        var def_barLayout = {
          title: "Top 10 Bacteria Cultures Found",
          margin: { t: 30, l: 150 },
          xaxis: { title:"sample values"},
          yaxis: {title:"otu ids"}
    

        };
        Plotly.newPlot("bar", def_barData, def_barLayout);
     
    
    

        //bubble variables
        var default_bubble_values = default_values;
        var default_bubble_labels = default_labels;
        var default_bubble_hover = default_hovertext;

        //Bubble graph
        var default_Bubble_d = {
            x:default_bubble_labels,
            y:default_bubble_values,
            mode:'markers',
            marker:{
                color:default_bubble_labels,
                size:default_bubble_values
            }
        };

        var default_Bubble=[default_Bubble_d];
        var default_layout2 = {
        title: "Bacteria Cultures Per Sample",
        showlegend: false,
        height: 600,
        width: 1000,
        xaxis: { title: "OTU ID" },
        };
        Plotly.newPlot("bubble", default_Bubble,default_layout2);


        ///////////////////    gauge plot
        //console.log(data.metadata[0].wfreq)
                            
        var default_gaugedata = [{
            type: "indicator",
            mode: "gauge+number",
            value: data.metadata[0].wfreq,
            title: { text: "Scrubs per week", font: { size: 24 } },
            gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "red" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 2], color: "ivory" },
                    { range: [2, 3], color:"bisque"},
                    { range: [3, 4], color:"grey"},
                    { range: [4, 5], color:"aqua"},
                    { range: [5, 6], color:"springgreen"},
                    { range: [6, 7], color:"chartreuse"},
                    { range: [7, 8], color:"lawngreen"},
                    { range: [8, 9], color:"lime"}
                
                ]
            }
        }];
  
        var default_layout3 = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "lavender",
            font: { color: "darkblue", family: "Arial" }
        };
        
        Plotly.newPlot('gauge', default_gaugedata, default_layout3);




        ///////////////////////////     D R O P D O W N     ///////////////////////////////////
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
           
            // Display the default plot
            //  Create  trace.
            var yticks = bar_labels.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
            var barData = [
            {
                y: yticks,
                x: bar_values.slice(0, 10).reverse(),
                text: bar_values.slice(0, 10).reverse().map(String),
                textposition: 'auto',
                type: "bar",
                orientation: "h",
            }
            ];
    
            var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 },
            xaxis: { title:"sample values"},
            yaxis: {title:"otu ids"}
        

            };
            Plotly.newPlot("bar", barData, barLayout);



            
            

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

            //gauge plot
            console.log(demographic_info[0].wfreq)
            
            //console.log(freq)
            var gaugedata = [
                {
                  type: "indicator",
                  mode: "gauge+number",
                  value: demographic_info[0].wfreq,
                  title: { text: "Scrubs per week", font: { size: 24 } },
                  gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "red" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                      { range: [0, 2], color: "ivory" },
                      { range: [2, 3], color:"bisque"},
                      { range: [3, 4], color:"grey"},
                      { range: [4, 5], color:"aqua"},
                      { range: [5, 6], color:"springgreen"},
                      { range: [6, 7], color:"chartreuse"},
                      { range: [7, 8], color:"lawngreen"},
                      { range: [8, 9], color:"lime"}
                      
                    ]
                  }
                }
              ];
              
              var layout = {
                width: 500,
                height: 400,
                margin: { t: 25, r: 25, l: 25, b: 25 },
                paper_bgcolor: "lavender",
                font: { color: "darkblue", family: "Arial" }
              };
              
              Plotly.newPlot('gauge', gaugedata, layout);
                
        })
    
    });

    
}


buildPlot();
    
        



