//On input keyup
$('body').on('keyup', '.b-cat input', function(){
  var $this = $(this),
      val = parseInt($this.val());
  
  //Set widths of categories
  setCatWidths($this.parents('.b'));
  
  calculateActualSize($(this).parents('.b'));
});

//Set width of category
function setCatWidths(scope) {
  scope.find('.b-cat input').each(function(){
     var $this = $(this),
         val = parseInt($this.val());
    $this.parent().width(calculateCatWidth(scope,val)+'%');
  });
}

setCatWidths($('.b'));

//Adjust budget value
$('body').on('keyup', '.b-size span', function(){
  
  //Check if actual size is over/under budget
  budgetOverUnder($(this).parents('.b')); 
});

//Calculate Actual Template Size
function calculateActualSize(scope) {
  var inputs = $('.b-cat input'),
      numInputs = inputs.length,
      totalActualSize = 0;
  
  //Calculate total value from each category
  scope.find('.b-cat input').each(function(){
     var val = parseInt($(this).val());
     totalActualSize = totalActualSize + val;
  });
  
  setActualSize(scope,totalActualSize);
  
  //Check if actual size is over/under budget
  budgetOverUnder(scope); 
}

calculateActualSize($('.b'));

//Calculate width
function calculateCatWidth(scope,val) {
  var actualSize = parseInt(scope.find('.actual-size span').text());
  console.log(actualSize);
  var categoryWidth = (val/actualSize)*100;
  return categoryWidth;
}

//Set Actual Size
function setActualSize(scope,val) {
  actualSize = val;
  scope.find('.actual-size span').text(val);
}

//Determine if actual size is within budget
function budgetOverUnder(scope) {
  var budgetSize = parseInt(scope.find('.b-size span').text());
  var actualSize = parseInt(scope.find('.actual-size span').text());
  var totalSize = actualSize/budgetSize;
  
  //If actual val is over budget
  if(totalSize>1) {
    scope.find('.b-header, .actual-size').addClass('has-error');
   scope.find('.b-cat-container').width('100%');
  } else {
    scope.find('.b-header, .actual-size').removeClass('has-error');
    scope.find('.b-cat-container').width(totalSize*100+'%');
  }
}

budgetOverUnder($('.b'));

//Make new Budget
$('.btn').on('click', function(){
  $('.b').last().clone().insertBefore('.btn');
});