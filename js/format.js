function convertToTeForm(verb)
{
	// verb should have the group


// group 1
"verb" + ["い","ち", "り"]　+ "ます"　=> "verb" + "って"
"verb" + ["き"] + "ます"　=> "verb" + "いて"
"verb" + ["ぎ"]　+ "ます"　=> "verb" + "いで"
"verb" + ["み", "び"]　+ "ます"　=> "verb" + "んで"
"verb" + ["し"]　+ "ます"　=> "verb" + "しで"
// exception
"いきます" => "いって"

// group 2

"verb" + "ます"　=> "verb" + "て";

// exception
"かります" => "かりて"

// group 3 (exceptions)
"verb" + "ます"　=> "verb" + "て";

"きます" => "きて"
"します" => "して"

}

function convertToNaiForm(verb)
{
	// verb should have the group


// group 1
"verb" + ["い","ち", "り"]　+ "ます"　=> "verb" + "って"
"verb" + ["き"] + "ます"　=> "verb" + "いて"
"verb" + ["ぎ"]　+ "ます"　=> "verb" + "いで"
"verb" + ["み", "び"]　+ "ます"　=> "verb" + "んで"
"verb" + ["し"]　+ "ます"　=> "verb" + "しで"
// exception
"いきます" => "いって"

// group 2

"verb" + "ます"　=> "verb" + "て";

// exception
"かります" => "かりて"

// group 3 (exceptions)
"verb" + "ます"　=> "verb" + "て";

"きます" => "きて"
"します" => "して"

}