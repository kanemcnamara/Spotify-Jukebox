<script id="results-template" type="text/x-handlebars-template">
        <div style="padding-top: 30px; padding-bottom: 20px" class="row">
				<div class="col-sm-4" style="color:black; text-align:center; font-size: 150%; font-weight: bold;"> Track Name </div>
				<div class="col-sm-4" style="color:black; text-align:center; font-size: 150%; font-weight: bold;"> Artist </div>
				<div class="col-sm-4" style="color:black; text-align:center; font-size: 150%; font-weight: bold;"> Request </div>
			</div>
    {{#each tracks.items}}
				<form name="submit_request" method="post" action="<?php echo $_POST['PHP_SELF']; ?>">
					<input type="hidden" name="spotify_id" value="{{id}}">
					<input type="hidden" name="spotify_uri" value="{{uri}}">
					<input type="hidden" name="spotify_title" value="{{name}}">
					<input type="hidden" name="spotify_artist" value="{{artists.0.name}}">
					<input type="hidden" name="explicit" value="{{explicit}}">

					<div class="row">
						<div class="col-sm-4" style="color:blck; font-size:120%;"> {{name}} </div>
						<div class="col-sm-4" style="color:black; font-size:120%;"> {{artists.0.name}} </div>
						<div class="col-sm-4" style="color:green;"> <input type="submit" class="btn btn-submit btn-sm" id="btn-request" name="btn-request" value="Request Song"> </div>
					</div> 
					
				</form>
			{{/each}}
  </script>
