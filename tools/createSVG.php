<?php
    $begin = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'.PHP_EOL
            .'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">'.PHP_EOL
            .'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'.PHP_EOL;
    $end = '</svg>';
    
    $startXY = 10;
    $endXY = 1000;
    
    $bg1 = fopen('../img/bg1.svg', 'wb');
    fwrite($bg1, $begin);
    
    for($i = 0; $i <= $endXY; $i += 10) {
        $line1 = '<line x1="0" y1="'.($startXY+$i).'" x2="'.($endXY-$i).'" y2="0" style="stroke:rgb('.rand(0,255).','.rand(0,100).','.rand(0,1).');stroke-width:1" />';
        $line2 = '<line x1="'.$endXY.'" y1="'.$i.'" x2="'.($endXY-$i).'" y2="'.$endXY.'" style="stroke:rgb('.rand(0,255).','.rand(0,1).','.rand(0,100).');stroke-width:1" />';
        $line3 = '<line x1="'.$i.'" y1="0" x2="'.$endXY.'" y2="'.$i.'" style="stroke:rgb('.rand(0,1).','.rand(0,100).','.rand(0,255).');stroke-width:1" />';
        $line4 = '<line x1="0" y1="'.$i.'" x2="'.($startXY+$i).'" y2="'.$endXY.'" style="stroke:rgb('.rand(0,100).','.rand(0,255).','.rand(0,1).');stroke-width:1" />';
        
        fwrite($bg1, $line1.PHP_EOL.$line2.PHP_EOL.$line3.PHP_EOL.$line4);
    }
    
    fclose($bg1);
?>