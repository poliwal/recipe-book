import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>;

  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Recipe',
  //     'This is a test recipe',
  //     'https://www.simplyrecipes.com/thmb/KRw_r32s4gQeOX-d07NWY1OlOFk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg',
  //     [
  //       new Ingredient("Potatoe",2),
  //       new Ingredient("Tomato",4),
  //     ]
  //   ),
  //   new Recipe(
  //     'Another Test Recipe 2',
  //     'This is a test recipe',
  //     'https://www.koimoi.com/wp-content/new-galleries/2022/02/the-batmans-early-reviews-released-early-the-robert-pattinson-starre-receives-nothing-but-praise-001.jpg',
  //     [
  //       new Ingredient("Something",2),
  //       new Ingredient("In the way",4),
  //     ]
  //   )
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService:ShoppingListService) { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice()
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
