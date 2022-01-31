page('/communes-2/information', async function () {
    await renderTemplate(templates('./templates/information.mustache'));

    let gameData = JSON.parse(localStorage.getItem('gameData'));
    let nom_commune = "Libellé de la commune";
    let communeCourante = gameData.communeCourante.libelleCommune;

    let remplacer_virgule_par_point = function(decimal) {
        return parseFloat((decimal+"").replace(",","."));
    }

    let data_Nom_Voix = function(d, commune){
        let l = 0;
        while(commune != d[l][nom_commune]){
            l++;
        }
        n = d[l]; 
        tab =  [];
        for(let i= 1; i<12; i++){
            let NomC = `NomC${i}`;
            let Voix = `% Voix/ExpC${i}`;
            tab.push({"NomC" : n[NomC], "Voix" : remplacer_virgule_par_point(n[Voix]), "Commune" : commune});
        }
        
        return tab;
    }

    let data_Nom_Voix_2T = function(d, commune){
        let l = 0;
        while(commune != d[l][nom_commune]){
            l++;
        }
        n = d[l]; 
        tab2 =  [];
        let V1 = "% Voix/Exp" ;
        let V2 = "% Voix/Exp__1";
        let N1 ="Nom";
        let N2 = "Nom__1"
        tab2.push({"Nom2T" : n[N1], "Voix2T" : remplacer_virgule_par_point(n[V1]), "Commune2T" : commune});
        tab2.push({"Nom2T" : n[N2], "Voix2T" : remplacer_virgule_par_point(n[V2]), "Commune2T" : commune});  

        return tab2;
    }

    dataSet = data_Nom_Voix(dat,communeCourante);
    data2t = data_Nom_Voix_2T(data2,communeCourante);

    pie();
    histo();
});

function histo() {
    const margin = 15;
    const width = 360 - 2 * margin;
    const height = 250 - 2 * margin;

    let col = ["red", "blue"];

    d3.select("#histogramme").selectAll("*").remove();
    let svg = d3.select("#histogramme")
        .append("svg")
        .attr("width", width + 2 * margin)
        .attr("height", height +  4 * margin)

    const chart = svg.append('g')
        .attr('transform', `translate(${margin * 2.8}, ${margin * 2})`)
    
    const color = d3.scaleOrdinal(col)
    color.domain(d => d.NomC)
    color.range();

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(dataSet.map(data => data.Voix)) + 5])

    chart.append('g')
        .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(dataSet.map(data => data.NomC))
        .padding(0.25)

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .style('font-size', '5px')

    const makeYLines = () => d3.axisLeft()
        .scale(yScale)
  
    chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
          .tickSize(-width, 0, 0)
          .tickFormat('')
          
        )

    const barGroups = chart.selectAll()
        .data(dataSet)
        .enter()
        .append('g')
  
    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.NomC) + 2 )
        .attr('y', (g) => yScale(g.Voix) )
        .attr('height', (g) => height - yScale(g.Voix) )
        .attr('width', xScale.bandwidth() - 4)
        .attr('fill', d => color(d.NomC))

    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.NomC) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.Voix))
      .style('font-size', '5px')
      .attr('text-anchor', 'middle')
      .text((a) => `${a.Voix}%`)


    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 3.5)
      .style('font-size', '10px')
      .attr('text-anchor', 'middle')
      .text('Candidats')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 )
      .attr('y', 14)
      .style('font-size', '13px')
      .attr('text-anchor', 'middle')
      .text(`Voix des candidats au 1er tour à ${dataSet[0].Commune}`)

    svg.append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin )
      .style('font-size', '10px')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text(' % de voix')
}

function pie(){
    let col = ["red", "blue"];

    const size = 350;
    const fourth = size / 4;
    const half = size / 2;
    const labelOffset = fourth / 2;
    const container = d3.select("#pie_chart");

    const chart = container.append('svg')
        .style('width', '100%')
        .attr('viewBox', `6 10 ${size-5} ${size}`);

    const plotArea = chart.append('g')
        .attr('transform', `translate(${half}, ${half/1.5})`);

    const color = d3.scaleOrdinal(col)
    color.domain(d => d.Nom2T)
    color.range();

    const pie = d3.pie()
        .sort(null)
        .value(d => d.Voix2T);
      
    const arcs = pie(data2t);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(fourth);

    const arcLabel = d3.arc()
        .innerRadius(labelOffset)
        .outerRadius(labelOffset);

    plotArea.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('fill', d => color(d.value))
            .attr('stroke', 'white')
            .attr('d', arc);

    const labels = plotArea.selectAll('text')
        .data(arcs)
        .enter()
        .append('text')
        .style('text-anchor', 'middle')
        .style('alignment-baseline', 'middle')
        .style('font-size', '7px')
        .attr('transform', d => `translate(${arcLabel.centroid(d)})`)

    labels.append('tspan')
          .attr('y', '0.01em')
          .attr('x', 0)
          .text(d => `${d.data.Nom2T} (${d.value}%)`);

    chart.append('text')
          .attr('class', 'title')
          .attr('x', size/2)
          .attr('y', 20)
          .style('font-size', '12px')
          .attr('text-anchor', 'middle')
          .text(`Voix des candidats au 2e tour à ${dataSet[0].Commune}`)
}