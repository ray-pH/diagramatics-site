<svelte:head>
    <title>Rolling Dice : Central Limit Theorem - Examples : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script>
    import Header from '../../Header.svelte'
    import Diagramatics from '../../Diagramatics.svelte'
    import DiagramaticsWithCode from '../../DiagramaticsWithCode.svelte'
    import 'diagramatics/css/diagramatics.css'
    import { base } from '$app/paths';
    var margin_right = 0;
    var width = 300;
    var height = 300;
    var width_withcode = 350;
    var height_withcode = 300;

    let dg_single_small =
        `
        let pip_positions = {
            1 : [V2(0,0)],
            2 : [V2(-1,-1), V2(1,1)],
            3 : [V2(-1,-1), V2(0,0), V2(1,1)],
            4 : [V2(-1,-1), V2(1,-1), V2(-1,1), V2(1,1)],
            5 : [V2(-1,-1), V2(1,-1), V2(0,0), V2(-1,1), V2(1,1)],
            6 : [V2(-1,-1), V2(1,-1), V2(-1,0), V2(1,0), V2(-1,1), V2(1,1)],
        }
        let generate_dice_pips = (n) => {
            let positions = pip_positions[n];
            let pips = positions.map((p) => regular_polygon(10,0.25).position(p));
            return diagram_combine(...pips).fill('black').stroke('none');
        }
        let generate_dice = (n) => {
            let outline = square(4)
                .apply(mod.round_corner(0.5, undefined, 4))
                .fill('none').stroke('black').strokewidth(2);
            let pips = generate_dice_pips(n);
            return diagram_combine(outline, pips);
        }
        const dice_diagram = [1,2,3,4,5,6].map((n) => generate_dice(n));

        function randint(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let dicevalue = new Array(20).fill(1);
        let bincount = new Array(6+1).fill(1);
        let datanames = range_inc(1,6).map(String);

        function reroll() { 
            for (let i = 0; i < dicevalue.length; i++) dicevalue[i] = randint(1,6);
        }
        function countbin(n){
            bincount.fill(0);
            for (let i = 0; i < n; i++) bincount[dicevalue[i]] += 1;
        }

        // ============================= diagram

        let subdiagram1 = rectangle(22,26);
        let subdiagram2 = subdiagram1.copy().translate(V2(22,0));
        let bbox2 = subdiagram2.bounding_box();

        let diagram_bg = subdiagram1.combine(subdiagram2).stroke('none');
        let baropt = {
            yrange : [0,10.1],
            bbox : [bbox2[0].add(V2(2,6)), bbox2[1].sub(V2(2,3))],
            ticksize: 0.5,
        }
        let xax = bar.xaxes(datanames, baropt);
        let yax = bar.yaxes(bincount.slice(1), baropt);
        let xlabel = text('value').move_origin_text('top-center')
            .position(xax.get_anchor('bottom-center')).translate(V2(0,-1.5));
        let ylabel = text('# of occurrence').move_origin_text('bottom-center')
            .position(yax.get_anchor('center-left')).translate(V2(-1.5,0))
            .textangle(to_radian(-90));

        int.draw_function = (inp) => {
            let n = inp['n'];
            countbin(n);

            // diagram1
            let dicelist = range(0,n).map((i) => dice_diagram[dicevalue[i]-1].copy());
            let dice = distribute_grid_row_c(dicelist, 4, 0.5, 0.5).flatten()
                .move_origin('top-left')
                .position(subdiagram1.get_anchor('top-left').add(V2(2,-2)));
            // diagram2
            let bars = bar.plot(bincount.slice(1), baropt).fill('lightblue').stroke('none');
            
            // draw
            draw(
                diagram_bg, dice, 
                bars, xax, yax, xlabel, ylabel,
        );
        }

        int.slider('n', 1, 20, 10, 1);
        reroll();
        int.draw();

        let btn = document.getElementById("roll_single");
        btn.onclick = () => {
            reroll();
            int.draw();
        }
        `

    let dg_single_big =
        `
        function randint(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let dicevalue = new Array(100000).fill(1);
        let bincount = new Array(6+1).fill(1);
        let datanames = range_inc(1,6).map(String);

        function reroll() { 
            for (let i = 0; i < dicevalue.length; i++) dicevalue[i] = randint(1,6);
        }
        function countbin(n){
            bincount.fill(0);
            for (let i = 0; i < n; i++) bincount[dicevalue[i]] += 1;
        }

        // ============================= diagram

        int.draw_function = (inp) => {
            let l = inp['log(n)'];
            let n = Math.pow(10,l);
            int.set('n', n);
            countbin(n);

            let maxy = Math.max(...bincount.slice(1), n/4);
            let baropt = {
                yrange : [0,maxy+0.5],
                bbox : [V2(0,0), V2(22,15)],
                ticksize: 0.5,
            }
            let margin = rectangle_corner(V2(-6,-4), V2(22,18)).stroke('none');
            let xax = bar.xaxes(datanames, baropt);
            let yax = bar.yaxes(bincount.slice(1), baropt);
            let xlabel = text('value').move_origin_text('top-center')
                .position(xax.get_anchor('bottom-center')).translate(V2(0,-1.5));
            let ylabel = text('# of occurrence').move_origin_text('bottom-center')
                .position(yax.get_anchor('center-left')).translate(V2(-4,0))
                .textangle(to_radian(-90));

            let bars = bar.plot(bincount.slice(1), baropt).fill('lightblue').stroke('none');
            
            // draw
            draw(
                margin, 
                bars, xax, yax, xlabel, ylabel,
            );
        }

        const italic_n = str_to_mathematical_italic('n');
        int.label('n',10);
        int.slider('log(n)', 0, 5, 1, 1, 1, (name,val) => \`log($\{italic_n\}) = $\{val\}\`);
        reroll();
        int.draw();

        let btn = document.getElementById("roll_single_big");
        btn.onclick = () => {
            reroll();
            int.draw();
        }
        `

    let dg_double_small = 
        `
        let pip_positions = {
            1 : [V2(0,0)],
            2 : [V2(-1,-1), V2(1,1)],
            3 : [V2(-1,-1), V2(0,0), V2(1,1)],
            4 : [V2(-1,-1), V2(1,-1), V2(-1,1), V2(1,1)],
            5 : [V2(-1,-1), V2(1,-1), V2(0,0), V2(-1,1), V2(1,1)],
            6 : [V2(-1,-1), V2(1,-1), V2(-1,0), V2(1,0), V2(-1,1), V2(1,1)],
        }
        let generate_dice_pips = (n) => {
            let positions = pip_positions[n];
            let pips = positions.map((p) => regular_polygon(10,0.25).position(p));
            return diagram_combine(...pips).fill('black').stroke('none');
        }
        let generate_dice = (n) => {
            let outline = square(4)
                .apply(mod.round_corner(0.5, undefined, 4))
                .fill('white').stroke('black').strokewidth(2);
            let pips = generate_dice_pips(n);
            return diagram_combine(outline, pips);
        }
        const dice_diagram = [1,2,3,4,5,6].map((n) => generate_dice(n).mut());

        function randint(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let dicevalue = new Array(20*2).fill(1);
        let bincount = new Array(12+1).fill(1);
        let datanames = range_inc(1,12).map(String);

        function reroll() { 
            for (let i = 0; i < dicevalue.length; i++) dicevalue[i] = randint(1,6);
        }
        function countbin(n){
            bincount.fill(0);
            for (let i = 0; i < n; i++) {
                let val = dicevalue[2*i] + dicevalue[2*i+1];
                bincount[val] += 1;
            } 
        }

        // ============================= diagram

        let subdiagram1 = rectangle(30,30);
        let subdiagram2 = rectangle(40,30).move_origin('top-left').position(subdiagram1.get_anchor('top-right'));
        let bbox2 = subdiagram2.bounding_box();

        let diagram_bg = subdiagram1.combine(subdiagram2).stroke('none');
        let baropt = {
            yrange : [0,10.1],
            bbox : [bbox2[0].add(V2(2,6)), bbox2[1].sub(V2(2,3))],
            ticksize: 0.5,
        }
        let xax = bar.xaxes(datanames, baropt);
        let yax = bar.yaxes(bincount.slice(1), baropt);
        let xlabel = text('value').move_origin_text('top-center')
            .position(xax.get_anchor('bottom-center')).translate(V2(0,-1.5));
        let ylabel = text('# of occurrence').move_origin_text('bottom-center')
            .position(yax.get_anchor('center-left')).translate(V2(-1.5,0))
            .textangle(to_radian(-90));
        let ddots_ = text('⋯').position(subdiagram1.get_anchor('bottom-right'))
            .translate(V2(-5.5,8))

        let bgrect = rectangle(6,13).apply(mod.round_corner(1, undefined, 4))
            .fill('lightblue').stroke('none').mut();

        int.draw_function = (inp) => {
            let n = inp['n'];
            countbin(n);

            // diagram1
            let dicepairlist = range(0,Math.min(n,7)).map((i) => {
                let vtop = dicevalue[2*i];
                let vbot = dicevalue[2*i+1];
                let vsum = vtop + vbot;
                let dtop = dice_diagram[vtop-1].copy();
                let dbot = dice_diagram[vbot-1].copy();
                let lsum = text(vsum);
                let pair = distribute_vertical_and_align_c([dtop, dbot, lsum], 1)
                let bg   = bgrect.copy().position(pair.origin).translate(V2(0,-3));
                return bg.combine(pair).mut();
            });
            let dice = distribute_grid_row_c(dicepairlist, 4, 0.5, 0.5).flatten()
                .move_origin('top-left')
                .position(subdiagram1.get_anchor('top-left').add(V2(2,-2)));
            let ddots = n > 7 ? ddots_ : empty(V2(0,0));

            // diagram2
            let bars = bar.plot(bincount.slice(1), baropt).fill('lightblue').stroke('none');
            
            // draw
            draw(
                diagram_bg, dice, 
                ddots,
                bars, xax, yax, xlabel, ylabel,
        );
        }

        int.slider('n', 1, 20, 10, 1);
        reroll();
        int.draw();

        let btn = document.getElementById("roll_double");
        btn.onclick = () => {
            reroll();
            int.draw();
        }
        `;

    let dg_double_big =
        `
        function randint(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let dicevalue = new Array(2*100000).fill(1);
        let bincount = new Array(12+1).fill(1);
        let datanames = range_inc(2,12).map(String);

        function reroll() { 
            for (let i = 0; i < dicevalue.length; i++) dicevalue[i] = randint(1,6);
        }
        function countbin(n){
            bincount.fill(0);
            for (let i = 0; i < n; i++) {
                let val = dicevalue[2*i] + dicevalue[2*i+1];
                bincount[val] += 1;
            } 
        }

        // ============================= diagram

        int.draw_function = (inp) => {
            let l = inp['log(n)'];
            let n = Math.pow(10,l);
            int.set('n', n);
            countbin(n);

            let maxy = Math.max(...bincount.slice(2), n/4);
            let baropt = {
                yrange : [0,maxy+0.5],
                bbox : [V2(0,0), V2(40,26)],
                ticksize: 0.5,
            }
            let margin = rectangle_corner(V2(-7,-4), V2(40,28)).stroke('none');
            let xax = bar.xaxes(datanames, baropt);
            let yax = bar.yaxes(bincount.slice(2), baropt);
            let xlabel = text('value').move_origin_text('top-center')
                .position(xax.get_anchor('bottom-center')).translate(V2(0,-1.5));
            let ylabel = text('# of occurrence').move_origin_text('bottom-center')
                .position(yax.get_anchor('center-left')).translate(V2(-5,0))
                .textangle(to_radian(-90));

            let bars = bar.plot(bincount.slice(2), baropt).fill('lightblue').stroke('none');
            
            // draw
            draw(
                margin,
                bars, xax, yax, xlabel, ylabel,
            );
        }

        const italic_n = str_to_mathematical_italic('n');
        int.label('n',10);
        int.slider('log(n)', 0, 5, 1, 1, 1, (name,val) => \`log($\{italic_n\}) = $\{val\}\`);
        reroll();
        int.draw();

        let btn = document.getElementById("roll_double_big");
        btn.onclick = () => {
            reroll();
            int.draw();
        }
        `

</script>
<style>
    hr{
        width: 95%;
        border-top: 1px dashed rgba(0,0,0,0.3);
    }
    .container {
        font-family: Ubuntu, sans-serif;
        padding: 10px;
        max-width: 800px;
        margin: auto;
    }
    .r-text {
        min-width: 400px;
        flex: 1 0;
    }
    .lr-diagram{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    em {
        color: #1f77b4;
        font-style: normal;
        font-weight: bold;
    }
    num {
        font-family: 'lm-math';
        color: #444;
    }
    var {
        font-family: 'lm-math';
        font-style: italic;
        color: #444;
    }
    .btn-container {
        margin-top: 20px;
        margin-left: 20px;
        margin-bottom: 50px;
    }
    .btn {
        width: 240px;
        font-family: inherit;
        border-style: none;
        padding: 10px;
        border-radius: 10px;
        background-color: #DDD;
    }
    .btn:hover{
        cursor: pointer;
        background-color: #EEE;
    }
</style>

<Header />

<div class="container">
<h1>Rolling Dice and Central Limit Theorem</h1>

<p>
    <em>Rolling dice</em> is a classic pastime, whether it's for a board game, gambling, or simply making decisions. The outcomes of these rolls may seem unpredictable at first glance, but there is a fascinating mathematical phenomenon at play. As we explore the results of rolling dice, we will uncover the remarkable relationship between dice rolling and the <em>Central Limit Theorem</em>, a fundamental concept in statistics that reveals the beauty of probability distributions.
</p>

<h3>1. Rolling a single Die</h3>
<p>
    Let's begin by considering the simplest case: rolling a single six-sided die. The die has six faces, each with an equal probability of landing face-up. Consequently, the probability distribution for a single die roll is uniform, showing a flat line when plotted. Each number from <num>1</num> to <num>6</num> has a <num>1/6</num> chance of appearing.
</p>

<center>
    <Diagramatics width={500} height={310}>
        {dg_single_small}
    </Diagramatics>
    <div class="btn-container">
        <button class="btn" id="roll_single">Re-roll</button>
    </div>
</center>

<p>
As you roll the die more times, you'll notice that the distribution starts to resemble the true probability distribution. Initially, you might get a string of a particular number, but as you roll more, the frequencies of each number tend to even out. This is the law of large numbers at work, which states that with more trials, the observed frequency will approach the true probability.
</p>

<center>
    <Diagramatics width={500} height={280}>
        {dg_single_big}
    </Diagramatics>
    <div class="btn-container">
        <button class="btn" id="roll_single_big">Re-roll</button>
    </div>
</center>

<h3>2. Rolling two Dice</h3>
<p>
    Now, let's introduce a second die. When you roll two dice, the outcomes are determined by the sum of the values on each die. The probability distribution for the sum of two dice follows a triangular shape. The outcomes in the middle (like <num>7</num>) have a higher probability of occurring compared to those at the extremes (like <num>2</num> or <num>12</num>). This distribution isn't uniform, as it was with a single die.
</p>

<center>
    <Diagramatics width={600} height={310}>
        {dg_double_small}
    </Diagramatics>
    <div class="btn-container">
        <button class="btn" id="roll_double">Re-roll</button>
    </div>
</center>

<p>
    With only <num>20</num> rolls, the distribution is still not clear. Each time we re-roll, the resulting distribution can vary very wildly. To get a clearer picture, you need to roll the dice many more times to smooth out these ups and downs and see the true distribution.
</p>

<center>
    <Diagramatics width={500} height={310}>
        {dg_double_big}
    </Diagramatics>
    <div class="btn-container">
        <button class="btn" id="roll_double_big">Re-roll</button>
    </div>
</center>

<br>
<hr>

</div>
