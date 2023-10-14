<svelte:head>
    <title>Utilities - Guide : Diagramatics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{base}/fonts/ubuntu.css" rel="stylesheet">
    <link href="{base}/fonts/lm-math.css" rel="stylesheet">
</svelte:head>

<script>
    import Header from '../../Header.svelte'
    import Diagramatics from '../../DiagramaticsWithCode.svelte'
    import Navigation from '../navigation.svelte'
    import 'diagramatics/css/diagramatics.css'
    import '../guides.css'
    import { base } from '$app/paths';

    var width = 0;
    var height = 0;
</script>

<Header />
<div class="guides-container">
    <Navigation page="utilities"/>

    <h1>Utilities</h1>
    Diagramatics provides some utility functions that can be used to create diagrams.

    <Diagramatics title="Vector2" {width} {height}>
        {`
        // creating a vector object
        let va = new Vector2(1,2);

        // you can also use the shorthand \`V2\`
        let vb = V2(1,2);

        // you can create a unit vector with a given angle using \`Vdir\`
        let vc = Vdir(Math.PI/2); // the same as \`V2(0,1)\`
        `}
    </Diagramatics>

    <Diagramatics title="Operation on Vector2" {width} {height}>
        {`
        let va = V2(1,2);
        let vb = V2(3,4);

        let vc, x;

        // addition
        vc = va.add(vb);  // V2(4,6);

        // subtraction
        vc = va.sub(vb);  // V2(-2,-2);

        // scaling
        vc = va.scale(2); // V2(2,4);

        // multiplication
        vc = va.mul(vb);  // V2(3,8);

        // rotation from the origin
        vc = va.rotate(Math.PI/2); // V2(-2,1);

        // dot product
        x = va.dot(vb); // 1*3 + 2*4 = 11;

        // cross product
        // * the cross product in 2D is a scalar
        x = va.cross(vb); // 1*4 - 2*3 = -2;

        // length
        x = va.length(); // sqrt(1*1 + 2*2) = sqrt(5);

        // length squared
        x = va.length_sq(); // 1*1 + 2*2 = 5;

        // angle from the positive x-axis
        x = va.angle(); // atan2(2,1) = 1.1071487177940904;

        // normalization
        vc = va.normalize(); // V2(1/sqrt(5), 2/sqrt(5));

        // checking for equality
        x = va.equals(vb); // false;
        `}
    </Diagramatics>

    <Diagramatics title="from_degree" subtitle="(angle : number)" {width} {height}>
        {`
        // helper function to convert from degrees to radians

        let angle = from_degree(30); // 0.5235987755982988 
        let ang2  = from_degree(90); // 1.5707963267948966 = Math.PI/2
        `}
    </Diagramatics>

    <Diagramatics title="array_repeat" subtitle="(arr : T[], len : number)" {width} {height}>
        {`
        // repeat an array until the length is \`len\`

        let arr = [1,2,3];
        let new_arr = array_repeat(arr, 5); // [1,2,3,1,2]
        `}
    </Diagramatics>

    <Diagramatics title="linspace" subtitle="(start : number, end : number, n : number = 100)" {width} {height}>
        {`
        // create a equivalently spaced array of numbers from start to end (inclusive)
        // [start, end]

        let arr1 = linspace(0, 1, 5); // [0, 0.25, 0.5, 0.75, 1]
        let arr2 = linspace(0, 1, 4); // [0, 0.333, 0.666, 1]
        `}
    </Diagramatics>

    <Diagramatics title="linspace_exc" subtitle="(start : number, end : number, n : number = 100)" {width} {height}>
        {`
        // create a equivalently spaced array of numbers from start to end (exclusice)
        // [start, end)

        let arr1 = linspace_exc(0, 1, 5); // [ 0, 0.2, 0.4, 0.6, 0.8 ]
        let arr2 = linspace_exc(0, 1, 4); // [ 0, 0.25, 0.5, 0.75 ]
        `}
    </Diagramatics>

    <Diagramatics title="range" subtitle="(start : number, end : number, step : number = 1)" {width} {height}>
        {`
        // create a equivalently spaced array of numbers from start to end (exclusive)
        // [start, end)

        let arr1 = range(0, 5);    // [0, 1, 2, 3, 4]
        let arr2 = range(0, 5, 1); // [0, 1, 2, 3, 4]
        let arr3 = range(0, 5, 2); // [0, 2, 4]
        let arr4 = range(0, 5, 0.5); // [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4.5]
        `}
    </Diagramatics>

    <Diagramatics title="range_inc" subtitle="(start : number, end : number, step : number = 1)" {width} {height}>
        {`
        // create a equivalently spaced array of numbers from start to end (inclusive)
        // [start, end]

        let arr1 = range_inc(0, 5);    // [0, 1, 2, 3, 4, 5]
        let arr2 = range_inc(0, 5, 1); // [0, 1, 2, 3, 4, 5]
        let arr3 = range_inc(0, 5, 2); // [0, 2, 4]
        let arr4 = range_inc(0, 5, 0.5); // [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4.5, 5]
        `}
    </Diagramatics>

</div>

