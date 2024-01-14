import { FunctionComponent } from 'react';

import * as data from '../data/data.json';

interface Recipe {
    id: string;
    source: string;
    target: string;
    "RT3": string;
    "RT2": string;
    "RT1": string;
    "RT0": string;
    //size: number;
    [key: string]: any; // Add this line
  }

const InfoPanel: FunctionComponent<{type: string, id: string, updateSelected: any}> = selected => {
    if(selected.type === '' || selected.id === '') {
        return (
            <div className='flex flex-col w-full h-full bg-slate-500 p-2 gap-1'>
                <p className='text-2xl'>Info Panel</p>
                <p className='text-xl'>Click on the graph to select something!</p>
                <p>When you do, information will appear here.</p>
                <p>From that, you can navigate through different recipes, goods, and buildings.</p>
            </div>
        );
    }
    else if(selected.type === 'good')
    {
        const good = data.goods.find(good => good.id === selected.id);

        //Sort Produced By by tier rating
        good?.producedBy.sort((a, b) => {
            return parseInt(b.split(":")[1].charAt(1)) - parseInt(a.split(":")[1].charAt(1));
        });
        return (
            <div className='flex flex-col w-full h-full bg-slate-500 p-2 gap-1'>
                <p className='text-2xl'>{good?.label}</p>
                {good?.usesFirst &&
                        <p className='text-lg underline'>Uses</p>}
                <div className='grid grid-rows-1 grid-flow-col w-full'>
                    {good?.usesFirst && 
                    <div>
                        {good?.usesFirst.map(ingredient => {
                            return (
                                <p className='hover:underline' onClick={() => {selected.updateSelected({type: 'recipe', id: `${ingredient}->${good.id}`})}} key={ingredient}>{ingredient}</p>
                            );
                        })}
                    </div>}
                    {(good?.usesSecond && good?.usesSecond.length > 0) && <p className='text-3xl font-bold'>+</p>}
                    {good?.usesSecond && <div>
                        {good?.usesSecond.map(ingredient => {
                            return (
                                <p className='hover:underline' onClick={() => {selected.updateSelected({type: 'recipe', id: `${ingredient}->${good.id}`})}} key={ingredient}>{ingredient}</p>
                            );
                        })}
                    </div>}
                </div>


                <p className='text-lg underline'>Produced By:</p>
                {
                    good?.producedBy.map(building => {
                        const buildingName = building.split(":")[0];
                        const stars = parseInt(building.split(":")[1].charAt(1));
                        const starRating = '★'.repeat(stars) + '☆'.repeat(3 - stars);
                        
                        return (
                            <p key={building}>{buildingName} ({starRating})</p>
                        );
                    })
                }
                {(good?.usedIn != undefined && good?.usedIn.length > 0) && <p className='text-lg underline'>Used In:</p>}
                {
                    good?.usedIn.map(recipe => {
                        return (
                            <p className='hover:underline cursor-pointer' onClick={() => {selected.updateSelected({type: 'recipe', id: `${good.id}->${recipe}`})}} key={recipe}>{recipe}</p>
                        );
                    })
                }
            </div>
        );
    }
    else if(selected.type === 'recipe')
    {
        const recipe = data.recipes.find(recipe => recipe.id === selected.id) as Recipe;
        //console.log(selected.id);
        //console.log(recipe);

        if(recipe == null || recipe == undefined || recipe.id == null || recipe.id == undefined)
            return (<></>)

        const source = recipe.id.split("->")[0];
        const target = recipe.id.split("->")[1];

        return (
            <div className='flex flex-col w-full h-full bg-slate-500 p-2 gap-1'>
                <div className='flex flex-row items-center'>
                    <p className='hover:underline text-2xl' onClick={() => {selected.updateSelected({type: 'good', id: source})}}>{source}</p>
                    <p className='text-2xl p-1'>{'->'}</p>
                    <p className='hover:underline text-2xl' onClick={() => {selected.updateSelected({type: 'good', id: target})}}>{target}</p>
                </div>
                {[...Array(4)].map((_, i) => {
                    const starRating = 3 - i;
                    const starKey = `RT${starRating}`;
                    if (recipe[starKey]) {
                        return (
                            <div key={starKey}>
                                <p>{'★'.repeat(starRating) + '☆'.repeat(3 - starRating)}</p>
                                <p>{recipe[starKey].split("|")[0].split(":")[0]} {recipe.source} {'->'} {recipe[starKey].split("|")[0].split(":")[1]} {recipe.target} in {recipe[starKey].split("|")[1]} seconds </p>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    }

};

export default InfoPanel;
