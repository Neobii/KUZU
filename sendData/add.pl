#!/usr/bin/perl
use strict;
use warnings;
use IO::Socket;
use URI::Escape;
use Getopt::Long;

# Configuration 
my $url = 'http://localhost'; #URL to get request
my $port = 3000;

if($#ARGV != 1){
	print("Usage: perl $0 -file file.json\n");
	exit(0);
}


my $file = '';

GetOptions ("file=s"   => \$file,)or die("Usage: perl $0 -file file.json\n");

if(-e $file && -f $file){
	my $str = oFile($file);
	print $str;
	my $regex = qr/"artist":\s+"(.+?)",\s+"track":\s+"(.+?)",\s"album":\s+"(.+?)",\s+"trackLength":\s+"(.+?)"/p;

		if ( $str =~ /$regex/g ) {
		  	my $artist = uri_escape($1) if defined $1; 
		  	my $track  = uri_escape($2) if defined $2;
		  	my $album  = uri_escape($3) if defined $3;
		  	my $length = uri_escape($4) if defined $4;


		  	get("/insertrack/track?artist=$artist&track=$track&album=$album&tracklength=$length");
		}
	
}else{
	print("$file Not Exist\n");
}


sub get{
	my $request  = shift;
	my $remote = IO::Socket::INET->new( Proto  => "tcp",
                                     PeerAddr  => $url,
                                     PeerPort  => $port,
                                    );

    print $remote;
     $url = $url.$request;
    print $url;
    print $remote "GET $request HTTP/1.0\015\012";
    while ( <$remote> ) { print }
    print "\n\n";
    close $remote;
	
}



sub oFile{
	my $jsonFile = shift;
	open(my $fh,'<',$jsonFile) or die $!;
	my $json = join('',<$fh>);
	close($fh);
	return $json;
}