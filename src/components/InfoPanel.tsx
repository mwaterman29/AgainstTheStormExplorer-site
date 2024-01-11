import React from 'react';
import { FunctionComponent, RefObject } from 'react';

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

const InfoPanel: FunctionComponent<{type: string, id: string}> = selected => {
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
        return (
            <div className='flex flex-col w-full h-full bg-slate-500 p-2 gap-1'>
                <p className='text-2xl'>{good?.label}</p>
                <p>Produced By:</p>
                {
                    good?.producedBy.map(building => {
                        return (
                            <p key={building}>{building}</p>
                        );
                    })
                }
                <p>Used In:</p>
                {
                    good?.usedIn.map(recipe => {
                        return (
                            <p key={recipe}>{recipe}</p>
                        );
                    })
                }
            </div>
        );
    }
    else if(selected.type === 'recipe')
    {
        const recipe = data.recipes.find(recipe => recipe.id === selected.id) as Recipe;
        console.log(selected.id);
        console.log(recipe);

        if(recipe == null)
            return (<></>)
        return (
            <div className='flex flex-col w-full h-full bg-slate-500 p-2 gap-1'>
                <p className='text-2xl'>{recipe?.id}</p>
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
